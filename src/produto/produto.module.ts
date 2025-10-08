import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoArmazenado } from "./produto.dm";

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoArmazenado],
})
export class ProdutoModule {}