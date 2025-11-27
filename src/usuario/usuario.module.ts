import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module'; // garante acesso ao DataSource
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { usuarioProviders } from './usuario.provider';
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { StrongPassValidator } from './validacao/senhaForte.validator';

import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [DatabaseModule],
//   controllers: [UsuarioController],
//   providers: [
//     ...usuarioProviders,  // repositório injetável
//     UsuarioService,        // service principal
//     EmailUnicoValidator,   // validador de e-mail único
//     StrongPassValidator,   // validador de senha forte
//   ],
//   exports: [UsuarioService],  // permite uso em outros módulos
// })
// export class UsuarioModule {}

@Module({
  imports: [
    DatabaseModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET, // valor vem EXCLUSIVAMENTE do .env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    UsuarioService,
    EmailUnicoValidator,
    StrongPassValidator,
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}

