import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.services';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // --------------------------
  // LISTAR TODOS (paginação)
  // --------------------------
  @Get()
  listar(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 100,
  ) {
    return this.reportsService.listar(Number(page), Number(pageSize));
  }

  // --------------------------
  // MÉDIA POR PRODUTO
  // --------------------------
  @Get('media-produto')
  mediaPorProduto() {
    return this.reportsService.mediaPorProduto();
  }

  // --------------------------
  // MAIS CAROS
  // --------------------------
  @Get('mais-caros')
  maisCaros(@Query('limit') limit = 20) {
    return this.reportsService.maisCaros(Number(limit));
  }

  // --------------------------
  // RESUMO POR MERCADO
  // --------------------------
  @Get('resumo-mercado')
  resumoPorMercado() {
    return this.reportsService.resumoPorMercado();
  }
}
