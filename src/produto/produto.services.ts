import { Injectable } from '@nestjs/common';
import { ProdutoEntityRepository } from './produto.repository';
import { ProdutoEntity } from './produto.entity';
import { CriarProdutoDto } from './dto/criarProduto.dto';
import {
  PriceEntryDto,
  PriceComparisonDto,
  PriceTrendDto,
  PriceVariationDto,
} from './dto/price-entry.dto';

@Injectable()
export class ProdutoService {
  constructor(private produtoRepository: ProdutoEntityRepository) {}

  async create(dados: CriarProdutoDto): Promise<PriceEntryDto> {
    const nomeOriginal = dados.nomeOriginal ?? 'Produto sem nome';
    const produto = this.produtoRepository.create({
      ...dados,
      nomeOriginal,
      nomeLimpo: this.limparNome(nomeOriginal),
      nomeOrdenado: this.ordenarNome(nomeOriginal),
      coletadoEm: dados.coletadoEm ? new Date(dados.coletadoEm) : new Date(),
    });

    const saved = await this.produtoRepository.save(produto);
    return this.mapToDto(saved);
  }

  async findAll(): Promise<PriceEntryDto[]> {
    const produtos = await this.produtoRepository.find({
      order: { coletadoEm: 'DESC' },
    });
    return produtos.map((p) => this.mapToDto(p));
  }

  async findByProductName(nome: string): Promise<PriceEntryDto[]> {
    const nomeLimpo = this.limparNome(nome);
    const produtos = await this.produtoRepository.find({
      where: { nomeLimpo },
      order: { coletadoEm: 'DESC' },
    });
    return produtos.map((p) => this.mapToDto(p));
  }

async findByBrand(marca: string): Promise<PriceEntryDto[]> {
  const marcaLimpa = this.limparNome(marca);
  const produtos = await this.produtoRepository.find({
    where: { marca: marcaLimpa },
    order: { coletadoEm: 'DESC' },
  });
  return produtos.map((p) => this.mapToDto(p));
}


  async getPriceHistory(nome: string): Promise<PriceEntryDto[]> {
    const nomeLimpo = this.limparNome(nome);
    const produtos = await this.produtoRepository.find({
      where: { nomeLimpo },
      order: { coletadoEm: 'ASC' },
    });
    return produtos.map((p) => this.mapToDto(p));
  }

  async findByMarket(mercado: string): Promise<PriceEntryDto[]> {
    const produtos = await this.produtoRepository.find({
      where: { mercado },
      order: { nomeLimpo: 'ASC' },
    });
    return produtos.map((p) => this.mapToDto(p));
  }

  async getUniqueProducts(): Promise<
    { nomeLimpo: string; nomeOriginal: string; marca: string }[]
  > {
    const produtos = await this.produtoRepository.find({
      select: ['nomeLimpo', 'nomeOriginal', 'marca'],
    });

    const unique = new Map<
      string,
      { nomeLimpo: string; nomeOriginal: string; marca: string }
    >();

    for (const p of produtos) {
      if (!unique.has(p.nomeLimpo)) {
        unique.set(p.nomeLimpo, {
          nomeLimpo: p.nomeLimpo,
          nomeOriginal: p.nomeOriginal,
          marca: p.marca,
        });
      }
    }

    return Array.from(unique.values());
  }

  async getPriceComparison(nome: string): Promise<PriceComparisonDto[]> {
    const nomeLimpo = this.limparNome(nome);
    const produtos = await this.produtoRepository.find({
      where: { nomeLimpo },
      order: { coletadoEm: 'DESC' },
    });

    const latestByMarket = new Map<string, ProdutoEntity>();
    for (const p of produtos) {
      if (
        !latestByMarket.has(p.mercado) ||
        new Date(p.coletadoEm) >
          new Date(latestByMarket.get(p.mercado)!.coletadoEm)
      ) {
        latestByMarket.set(p.mercado, p);
      }
    }

    return Array.from(latestByMarket.values()).map((p) => ({
      mercado: p.mercado,
      preco: p.preco,
      coletadoEm: p.coletadoEm,
    }));
  }

  async getPriceTrend(nome: string): Promise<PriceTrendDto> {
    const nomeLimpo = this.limparNome(nome);
    const produtos = await this.produtoRepository.find({
      where: { nomeLimpo },
      order: { coletadoEm: 'ASC' },
    });

    if (produtos.length === 0) {
      return {
        nomeLimpo,
        entries: [],
        statistics: {
          minPrice: 0,
          maxPrice: 0,
          avgPrice: 0,
          latestPrice: 0,
          priceChange: 0,
          percentChange: 0,
          totalDataPoints: 0,
        },
      };
    }

    const prices = produtos.map((p) => p.preco);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const latestPrice = prices[prices.length - 1];
    const priceChange = latestPrice - prices[0];
    const percentChange = parseFloat(((priceChange / prices[0]) * 100).toFixed(2));

    return {
      nomeLimpo,
      entries: produtos.map((p) => this.mapToDto(p)),
      statistics: {
        minPrice,
        maxPrice,
        avgPrice,
        latestPrice,
        priceChange,
        percentChange,
        totalDataPoints: produtos.length,
      },
    };
  }

  async getProductsWithHighestVariation(
    limit = 10,
  ): Promise<PriceVariationDto[]> {
    const produtos = await this.produtoRepository.find();
    const variations = new Map<string, number[]>();

    for (const p of produtos) {
      if (!variations.has(p.nomeLimpo)) variations.set(p.nomeLimpo, []);
      variations.get(p.nomeLimpo)!.push(p.preco);
    }

    const result = Array.from(variations.entries())
      .map(([nomeLimpo, prices]) => {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const variation = maxPrice - minPrice;
        const percentVariation = parseFloat(
          ((variation / minPrice) * 100).toFixed(2),
        );
        return {
          nomeLimpo,
          minPrice,
          maxPrice,
          variation,
          percentVariation,
          dataPoints: prices.length,
        };
      })
      .sort((a, b) => b.variation - a.variation)
      .slice(0, limit);

    return result;
  }

  async update(id: number, dados: CriarProdutoDto): Promise<PriceEntryDto> {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) throw new Error('Produto não encontrado');

    Object.assign(produto, dados);
    const updated = await this.produtoRepository.save(produto);
    return this.mapToDto(updated);
  }

  async delete(id: number): Promise<PriceEntryDto> {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) throw new Error('Produto não encontrado');

    await this.produtoRepository.remove(produto);
    return this.mapToDto(produto);
  }

  private limparNome(nome: string): string {
    return nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  }

  private ordenarNome(nome: string): string {
    return this.limparNome(nome).split(/\s+/).sort().join(' ');
  }

  private mapToDto(p: ProdutoEntity): PriceEntryDto {
    return {
      id: p.id,
      mercado: p.mercado,
      marca: p.marca,
      peso: p.peso,
      nomeOriginal: p.nomeOriginal,
      nomeLimpo: p.nomeLimpo,
      nomeOrdenado: p.nomeOrdenado,
      url: p.url,
      preco: p.preco,
      imagem: p.imagem,
      coletadoEm: p.coletadoEm,
      createdAt: (p as any).createdAt ?? new Date(0),
      updatedAt: (p as any).updatedAt ?? new Date(0),
    };
  }
}

