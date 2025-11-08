import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AlterarProdutoDto {
  @IsString()
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  @ApiProperty({example: 'Arroz',
                description: 'Nome do produto'}
  )
  nome?: string;

  @IsString()
  @IsNotEmpty({message: 'A marca não pode ser vazia'})
  @ApiProperty({example: 'pateko',
                  description: 'Marca do produto'}  
  )    
  marca?: string;

  @IsString()
  @IsNotEmpty({message: 'O peso não pode ser vazio'})
  @ApiProperty({example: '5kg',
                  description: 'Peso do produto'}  
  )
  peso?: string;
  
  @IsString()
  @IsNotEmpty({message: 'O preço não pode ser vazio'})
  @ApiProperty({example: '20.00',
                  description: 'Preço do valor'}  
  )
  preco?: string;
}


