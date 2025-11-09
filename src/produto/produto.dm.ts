// import { Injectable } from "@nestjs/common";
// import { ProdutoEntity } from "./produto.entity";
// import { AlterarProdutoDto } from "./dto/alterarProduto.dto";

// @Injectable()
// export class ProdutoArmazenado {
//   private _produtos: ProdutoEntity[] = [];

//   get produtos(): ProdutoEntity[] {
//     return this._produtos;
//   }

//   adicionarProduto(produto: ProdutoEntity) {
//     this._produtos.push(produto);
//   }

//   atualizaProduto(id: string, dados: AlterarProdutoDto): ProdutoEntity {
//     const produto = this._produtos.find((p) => p.id === id);
//     if (!produto) {
//       throw new Error("Produto não encontrado");
//     }

//     if (dados.nome) produto.nome = dados.nome;
//     if (dados.marca) produto.marca = dados.marca;
//     if (dados.peso) produto.peso = dados.peso;
//     if (dados.preco) produto.preco = dados.preco;

//     return produto;
//   }

//   removeProduto(id: string): ProdutoEntity {
//     const index = this._produtos.findIndex((p) => p.id === id);
//     if (index === -1) {
//       throw new Error("Produto não encontrado");
//     }
//     const [removido] = this._produtos.splice(index, 1);
//     return removido;
//   }
// }