import { IsNotEmpty } from 'class-validator';
import { NomeUnico } from '../validacao/nomeUnico.validator';

export class CriarMercadoDto {
  @IsNotEmpty()
  @NomeUnico({ message: 'Este nome de mercado já está em uso.' })
  nome: string;

  @IsNotEmpty()
  endereco: string;

}
