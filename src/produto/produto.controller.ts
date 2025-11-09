import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProdutoService } from './produto.services';
import { CriarProdutoDto } from './dto/criarProduto.dto';
import { PriceEntryDto, PriceComparisonDto, PriceTrendDto, PriceVariationDto } from './dto/price-entry.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // Criar novo produto
  @Post()
  async create(@Body() dados: CriarProdutoDto): Promise<PriceEntryDto> {
    return this.produtoService.create(dados);
  }

  // Obter todos os produtos
  @Get()
  async findAll(): Promise<PriceEntryDto[]> {
    return this.produtoService.findAll();
  }

  // Buscar produtos pelo nome
  @Get('by-name/:nome')
  async findByProductName(@Param('nome') nome: string): Promise<PriceEntryDto[]> {
    return this.produtoService.findByProductName(nome);
  }

// Buscar produtos pela marca
@Get('by-brand/:marca')
async findByBrand(@Param('marca') marca: string): Promise<PriceEntryDto[]> {
  return this.produtoService.findByBrand(marca);
}

  // Obter histórico de preços de um produto
  @Get('price-history/:nome')
  async getPriceHistory(@Param('nome') nome: string): Promise<PriceEntryDto[]> {
    return this.produtoService.getPriceHistory(nome);
  }

  // Obter produtos de um mercado específico
  @Get('by-market/:mercado')
  async findByMarket(@Param('mercado') mercado: string): Promise<PriceEntryDto[]> {
    return this.produtoService.findByMarket(mercado);
  }

  // Obter produtos únicos
  @Get('unique-products')
  async getUniqueProducts(): Promise<{ nomeLimpo: string; nomeOriginal: string; marca: string }[]> {
    return this.produtoService.getUniqueProducts();
  }

  // Comparar preços de um produto em diferentes mercados
  @Get('price-comparison/:nome')
  async getPriceComparison(@Param('nome') nome: string): Promise<PriceComparisonDto[]> {
    return this.produtoService.getPriceComparison(nome);
  }

  // Obter tendência de preço de um produto
  @Get('price-trend/:nome')
  async getPriceTrend(@Param('nome') nome: string): Promise<PriceTrendDto> {
    return this.produtoService.getPriceTrend(nome);
  }

  // Obter produtos com maior variação de preço
@Get('/produtos/highest-variation/:limit')
async getHighestVariation(@Param('limit') limit?: string) {
  const l = limit ? parseInt(limit) : 10; // valor padrão
  return this.produtoService.getProductsWithHighestVariation(l);
}


  // Atualizar produto (exemplo genérico)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dados: CriarProdutoDto): Promise<PriceEntryDto> {
    return this.produtoService.update(id, dados);
  }

  // Deletar produto
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<PriceEntryDto> {
    return this.produtoService.delete(id);
  }
}
