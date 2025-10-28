// src/database/produtos.database.ts
import { ProdutoEntity } from '../produto/produto.entity';
import { MercadoEntity } from '../mercado/mercado.entity';
import { v4 as uuid } from 'uuid';

// Simulação de um "banco local" em memória
export class ProdutosDatabase {
  private static _instance: ProdutosDatabase;

  produtos: ProdutoEntity[] = [];
  mercados: MercadoEntity[] = [];

  private constructor() {
    // Dados fixos iniciais para teste — agora com id gerado corretamente
    this.produtos = [
      new ProdutoEntity(uuid(), 'Arroz', 'Tio João', '1kg', '5.49'),
      new ProdutoEntity(uuid(), 'Feijão', 'Camil', '1kg', '7.89'),
      new ProdutoEntity(uuid(), 'Leite', 'Itambé', '1L', '4.99'),
      new ProdutoEntity(uuid(), 'Açúcar', 'União', '1kg', '3.49'),
    ];

    // this.mercados = [
    //   new MercadoEntity('Supermercado A', 'Rua das Flores, 100'),
    //   new MercadoEntity('Supermercado B', 'Av. Central, 250'),
    //   new MercadoEntity('Supermercado C', 'Rua Nova, 42'),
    // ];
  }

  static get instance(): ProdutosDatabase {
    if (!ProdutosDatabase._instance) {
      ProdutosDatabase._instance = new ProdutosDatabase();
    }
    return ProdutosDatabase._instance;
  }

  adicionarProduto(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  atualizarProduto(id: string, dados: Partial<ProdutoEntity>) {
    const produto = this.produtos.find(p => p.id === id);
    if (!produto) throw new Error('Produto não encontrado');
    Object.assign(produto, dados);
  }

  removerProduto(id: string) {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }

  adicionarMercado(mercado: MercadoEntity) {
    this.mercados.push(mercado);
  }

  removerMercado(id: string) {
    this.mercados = this.mercados.filter(m => m.id !== id);
  }
}
