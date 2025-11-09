import { Module } from '@nestjs/common';
import { ProdutoService } from './produto/produto.services';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoEntityRepository } from './produto/produto.repository';
import { DatabaseModule } from './database/database.module';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoEntityRepository],
  exports: [ProdutoService],
})
export class ProdutoModule {}
