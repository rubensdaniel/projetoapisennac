// import { IsNotEmpty, IsString } from "class-validator";
// import { ApiProperty } from '@nestjs/swagger';

// export class CriarProdutoDto {
//   @IsString()
//   @IsNotEmpty({message: 'O nome não pode ser vazio'})
//   @ApiProperty({example: 'Arroz',
//                 description: 'Nome do produto'}
//   )
//   nome: string; 

//   @IsString()
//   @IsNotEmpty({message: 'A marca não pode ser vazia'})
//   @ApiProperty({example: 'pateko',
//                   description: 'Marca do produto'}  
//   )                  
//   marca: string;
  
//   @IsString()
//   @IsNotEmpty({message: 'O peso não pode ser vazio'})
//   @ApiProperty({example: '5kg',
//                   description: 'Peso do produto'}  
//   )
//   peso: string;
  
//   @IsString()
//   @IsNotEmpty({message: 'O preço não pode ser vazio'})
//   @ApiProperty({example: '20.00',
//                   description: 'Preço do valor'}  
//   )
//   preco: string;
// }

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @ApiProperty({
    example: 'Arroz',
    description: 'Nome do produto',
  })
  nome!: string;

  @IsString()
  @IsNotEmpty({ message: 'O mercado não pode ser vazio' })
  @ApiProperty({
    example: 'Mercado Bom Preço',
    description: 'Nome do mercado onde o produto foi encontrado',
  })
  mercado!: string;

  @IsString()
  @IsNotEmpty({ message: 'A marca não pode ser vazia' })
  @ApiProperty({
    example: 'Pateko',
    description: 'Marca do produto',
  })
  marca!: string;

  @IsString()
  @IsNotEmpty({ message: 'O peso não pode ser vazio' })
  @ApiProperty({
    example: '5kg',
    description: 'Peso do produto',
  })
  peso!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O preço não pode ser vazio' })
  @ApiProperty({
    example: 20.0,
    description: 'Preço do produto em reais',
  })
  preco!: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://site.com/produto/arroz',
    description: 'URL do produto (opcional)',
    required: false,
  })
  url?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://site.com/imagens/arroz.jpg',
    description: 'URL da imagem do produto (opcional)',
    required: false,
  })
  imagem?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Arroz Pateko 5kg',
    description: 'Nome original capturado do site (opcional)',
    required: false,
  })
  nomeOriginal?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'arroz pateko',
    description: 'Nome limpo (sem caracteres especiais)',
    required: false,
  })
  nomeLimpo?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'pateko arroz',
    description: 'Nome ordenado para comparação e buscas (opcional)',
    required: false,
  })
  nomeOrdenado?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '2025-11-09T12:00:00.000Z',
    description: 'Data e hora da coleta do produto (opcional)',
    required: false,
  })
  coletadoEm?: string;
}
