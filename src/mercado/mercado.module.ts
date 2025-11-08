import { Module } from '@nestjs/common';
import { MercadoController } from './mercado.controller';
import { MercadosArmazenados } from './mercado.dm';
import { NomeUnicoMercadoValidator } from './validacao/nomeUnico.validator';

@Module({
  controllers: [MercadoController],
  providers: [MercadosArmazenados, NomeUnicoMercadoValidator],
  exports: [MercadosArmazenados],
})
export class MercadoModule {}
