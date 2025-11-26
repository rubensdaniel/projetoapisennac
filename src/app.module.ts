import { Module } from '@nestjs/common';
import { ProdutoService } from './produto/produto.services';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoEntityRepository } from './produto/produto.repository';
import { DatabaseModule } from './database/database.module';
import { UsuarioService } from './usuario/usuario.service';

//import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
//import { DatabaseModule } from './database/database.module';

@Module({
  // imports: [
  //   DatabaseModule,
  //   ProdutoModule,
  //   UsuarioModule,
  imports: [DatabaseModule, UsuarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoEntityRepository],
  exports: [ProdutoService],  
  
})
//export class AppModule {}

export class ProdutoModule {}


