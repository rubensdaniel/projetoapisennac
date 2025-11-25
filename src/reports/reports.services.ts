import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProdutoNormalizado } from './entities/produto-normalizado.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ProdutoNormalizado)
    private readonly produtosRepo: Repository<ProdutoNormalizado>,
  ) {}

  // =====================================================
  // LISTAR COM PAGINAÇÃO
  // =====================================================
  async listar(page = 1, pageSize = 100) {
    const offset = (page - 1) * pageSize;

    const data = await this.produtosRepo.query(
      `
      SELECT *
      FROM produtos_normalizados
      ORDER BY coletado_em DESC
      LIMIT ? OFFSET ?
      `,
      [pageSize, offset],
    );

    const total = await this.produtosRepo.query(`
      SELECT COUNT(*) AS total FROM produtos_normalizados
    `);

    return {
      page,
      pageSize,
      total: total[0].total,
      data,
    };
  }

  // =====================================================
  // MÉDIA DE PREÇO POR PRODUTO AGRUPADO (nome_limpo)
  // =====================================================
  async mediaPorProduto() {
    return this.produtosRepo.query(`
      SELECT 
        nome_limpo,
        ROUND(AVG(preco), 2) AS preco_medio,
        COUNT(*) AS registros
      FROM produtos_normalizados
      GROUP BY nome_limpo
      ORDER BY preco_medio DESC
    `);
  }

  // =====================================================
  // PRODUTOS MAIS CAROS
  // =====================================================
  async maisCaros(limit = 20) {
    return this.produtosRepo.query(
      `
      SELECT nome_limpo, mercado, preco
      FROM produtos_normalizados
      ORDER BY preco DESC
      LIMIT ?
      `,
      [limit],
    );
  }

  // =====================================================
  // AGRUPAMENTO POR MERCADO
  // =====================================================
  async resumoPorMercado() {
    return this.produtosRepo.query(`
      SELECT 
        mercado,
        COUNT(*) AS total_itens,
        ROUND(AVG(preco), 2) AS preco_medio
      FROM produtos_normalizados
      GROUP BY mercado
      ORDER BY mercado ASC
    `);
  }
}
