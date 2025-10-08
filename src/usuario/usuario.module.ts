import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuariosArmazenados } from "./usuario.dm";  // importe o provider aqui

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosArmazenados],  // registre aqui o provider
  exports: [UsuariosArmazenados],    // exporte se for usar em outros módulos
})
export class UsuarioModule {}
