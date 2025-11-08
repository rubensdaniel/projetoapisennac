import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoArmazenado } from "./produto.dm";
import { CriarProdutoDto } from "./dto/criarProduto.dto";
import { AlterarProdutoDto } from "./dto/alterarProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uuid } from "uuid";

@Controller("/produtos")
export class ProdutoController {
  constructor(private produtos: ProdutoArmazenado) {}

  @Post()
  async criarProduto(@Body() dados: CriarProdutoDto) {
    const novoProduto = new ProdutoEntity(
      uuid(),
      dados.nome,
      dados.marca,
      dados.peso,
      dados.preco
    );

    this.produtos.adicionarProduto(novoProduto);

    return {
      produto: novoProduto,
      message: "Produto criado com sucesso",
    };
  }

  @Get()
  async listarProdutos(): Promise<ProdutoEntity[]> {
    return this.produtos.produtos;
  }

  @Put("/:id")
  async atualizarProduto(
    @Param("id") id: string,
    @Body() dados: AlterarProdutoDto
  ) {
    const atualizado = this.produtos.atualizaProduto(id, dados);
    return {
      produto: atualizado,
      message: "Produto atualizado com sucesso",
    };
  }

  @Delete("/:id")
  async deletarProduto(@Param("id") id: string) {
    const removido = this.produtos.removeProduto(id);
    return {
      produto: removido,
      message: "Produto deletado com sucesso",
    };
  }
}