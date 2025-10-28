// import { IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { NomeUnico } from '../validacao/nomeUnico.validator';

// export class CriarMercadoDto {
//   @IsString()
//   @IsNotEmpty({ message: 'O nome do mercado não pode ser vazio.' })
//   @NomeUnico({ message: 'Este nome de mercado já está em uso.' })
//   @ApiProperty({
//     example: 'Supermercado Central',
//     description: 'Nome único do mercado que será cadastrado',
//   })
//   nome: string;

//   @IsString()
//   @IsNotEmpty({ message: 'O endereço não pode ser vazio.' })
//   @ApiProperty({
//     example: 'Rua das Flores, 123 - Centro',
//     description: 'Endereço completo do mercado',
//   })
//   endereco: string;
// }

import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
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

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode ser vazio.' })
  @ApiProperty({
    example: '(00) 00000-0000',
    description: 'Telefone de contato do mercado',
  })
  telefone: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  @ApiProperty({
    example: 'contato@mercado.com',
    description: 'E-mail de contato do mercado',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A rua não pode ser vazia.' })
  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Rua ou avenida do endereço do mercado',
  })
  rua: string;

  @IsString()
  @IsNotEmpty({ message: 'O número não pode ser vazio.' })
  @ApiProperty({
    example: '123',
    description: 'Número do endereço do mercado',
  })
  numero: string;

  @IsString()
  @IsNotEmpty({ message: 'O bairro não pode ser vazio.' })
  @ApiProperty({
    example: 'Centro',
    description: 'Bairro do endereço do mercado',
  })
  bairro: string;

  @IsString()
  @IsNotEmpty({ message: 'O CEP não pode ser vazio.' })
  @ApiProperty({
    example: '00000-000',
    description: 'CEP do endereço do mercado',
  })
  cep: string;
}

