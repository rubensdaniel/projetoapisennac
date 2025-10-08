import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NomeUnico } from '../validacao/nomeUnico.validator';

export class CriarMercadoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do mercado não pode ser vazio.' })
  @NomeUnico({ message: 'Este nome de mercado já está em uso.' })
  @ApiProperty({
    example: 'Supermercado Central',
    description: 'Nome único do mercado que será cadastrado',
  })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O endereço não pode ser vazio.' })
  @ApiProperty({
    example: 'Rua das Flores, 123 - Centro',
    description: 'Endereço completo do mercado',
  })
  endereco: string;
}
