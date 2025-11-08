// import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
// import { ApiProperty } from "@nestjs/swagger";
// import { EmailUnico } from "../validacao/email-unico.validator";
// import { SenhaForte } from "../validacao/senhaForte.validator";

// export class CriaUsuarioDTO {
//   @ApiProperty({
//     example: 'SIlva Santos',
//     description: 'Nome completo do usuário',
//   })
//   @IsString()
//   @IsNotEmpty({ message: 'O nome não pode ser vazio' })
//   nome: string;

//   @ApiProperty({
//     example: 'joao.silva@email.com',
//     description: 'Endereço de e-mail do usuário (deve ser único e válido)',
//   })
//   @IsEmail(undefined, { message: 'Email inválido' })
//   @IsString()
//   @IsNotEmpty({ message: 'O email não pode ser vazio' })
//   @EmailUnico({ message: 'Email já cadastrado' })
//   email: string;

//   @ApiProperty({
//     example: '(14) 99999-9999',
//     description: 'Número de telefone do usuário',
//   })
//   @IsNotEmpty({ message: 'Telefone não pode ser vazio' })
//   @IsString()
//   telefone: string;

//   @ApiProperty({
//     example: 'Senha@123',
//     description: 'Senha do usuário (mínimo 6 caracteres, deve ser forte)',
//   })
//   @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
//   @IsNotEmpty({ message: 'A senha não pode ser vazia' })
//   @IsString()
//   @SenhaForte({ message: 'A senha deve ser mais forte' })
//   senha: string;
// }


import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senhaForte.validator";

export class CriaUsuarioDTO {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do usuário',
  })
  @IsString()
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  nome: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Endereço de e-mail do usuário (deve ser único e válido)',
  })
  @IsEmail(undefined, { message: "Email inválido" })
  @IsString()
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  @EmailUnico({ message: "Email já cadastrado" })
  email: string;

  @ApiProperty({
    example: '(14) 99999-9999',
    description: 'Número de telefone do usuário',
  })
  @IsString()
  @IsNotEmpty({ message: "Telefone não pode ser vazio" })
  telefone: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha do usuário (mínimo 6 caracteres e deve ser forte)',
  })
  @IsString()
  @IsNotEmpty({ message: "A senha não pode ser vazia" })
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  @SenhaForte({ message: "A senha deve ser mais forte" })
  senha: string;
}
