// import { Module } from "@nestjs/common";
// import { UsuarioController } from "./usuario.controller";
// import { UsuariosArmazenados } from "./usuario.service";  // importe o provider aqui

// @Module({
//   controllers: [UsuarioController],
//   providers: [UsuariosArmazenados],  // registre aqui o provider
//   exports: [UsuariosArmazenados],    // exporte se for usar em outros módulos
// })
// export class UsuarioModule {}


// 07/11/2025
// import { Module } from "@nestjs/common";
// import { UsuarioController } from "./usuario.controller";
// import { UsuarioService } from "./usuario.service";
// import { EmailUnicoValidator } from "./validacao/email-unico.validator";
// import { StrongPassValidator } from "./validacao/senhaForte.validator";

// @Module({
//   controllers: [UsuarioController],
//   providers: [
//     UsuarioService,
//     EmailUnicoValidator,
//     StrongPassValidator
//   ],
//   exports: [UsuarioService],
// })
// export class UsuarioModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module'; // garante acesso ao DataSource
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { usuarioProviders } from './usuario.provider';
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { StrongPassValidator } from './validacao/senhaForte.validator';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,  // repositório injetável
    UsuarioService,        // service principal
    EmailUnicoValidator,   // validador de e-mail único
    StrongPassValidator,   // validador de senha forte
  ],
  exports: [UsuarioService],  // permite uso em outros módulos
})
export class UsuarioModule {}

