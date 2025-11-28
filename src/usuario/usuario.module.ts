import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { usuarioProviders } from './usuario.provider';
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { StrongPassValidator } from './validacao/senhaForte.validator';

@Module({
  imports: [
    DatabaseModule, // ❗ Único necessário
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
