import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { MercadoModule } from './mercado/mercado.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuariosArmazenados } from './usuario/usuario.dm';



@Module({
  imports: [UsuarioModule, ProdutoModule, MercadoModule],
  controllers: [UsuarioController],
  providers: [UsuariosArmazenados],
})
export class AppModule {}
