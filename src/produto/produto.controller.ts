import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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
  @Get('marca-produto/:nome')
  async findByProductName(@Param('nome') nome: string): Promise<PriceEntryDto[]> {
    return this.produtoService.findByProductName(nome);
  }

// Buscar produtos pela marca
@Get('tipo-produto/:marca')
async findByBrand(@Param('marca') marca: string): Promise<PriceEntryDto[]> {
  return this.produtoService.findByBrand(marca);
}

  // Obter histórico de preços de um produto
  @Get('historico-preco/:nome')
  async getPriceHistory(@Param('nome') nome: string): Promise<PriceEntryDto[]> {
    return this.produtoService.getPriceHistory(nome);
  }

  // Obter produtos de um mercado específico
  @Get('mercado/:mercado')
  async findByMarket(@Param('mercado') mercado: string): Promise<PriceEntryDto[]> {
    return this.produtoService.findByMarket(mercado);
  }

  // Obter produtos únicos
  @Get('produto-unico')
  async getProdutoUnico(): Promise<{ nomeOrdenado: string; nomeLimpo: string; marca: string; peso: string }[]> {
    return this.produtoService.getProdutoUnico();
  }


// Endpoint para produtos mais repetidos, com filtro por peso e marca
@Get('mais-repetidos')
async getMostRepeatedProducts(
  @Query('limit') limit?: string,  // opcional, default 10
  @Query('peso') peso?: string,    // opcional
  @Query('marca') marca?: string,  // opcional
) {
  const parsedLimit = limit ? parseInt(limit, 10) : 10;
  return this.produtoService.getMostRepeatedProducts(parsedLimit, peso, marca);
}




// Comparar preços de um produto em diferentes mercados
@Get('comparacao-preco/:nome')
async getPriceComparison(
  @Param('nome') nome: string,
  @Query('peso') peso?: string, // <-- adiciona peso como query param opcional
): Promise<PriceComparisonDto[]> {
  return this.produtoService.getPriceComparison(nome, peso);
}



// Obter tendência de preço de um produto
@Get('variacao-preco/:nome/:peso')
async getPriceTrend(
  @Param('nome') nomeOrdenado: string,
  @Param('peso') peso: string,
): Promise<PriceTrendDto> {
  return this.produtoService.getPriceTrend(nomeOrdenado, peso);
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
