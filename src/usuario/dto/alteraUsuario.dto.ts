// import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator";
// import { EmailUnico } from "../validacao/email-unico.validator";
// import { SenhaForte } from "../validacao/senhaForte.validator";

// export class AlteraUsuarioDTO {
//   @IsString()
//   @IsNotEmpty({message: 'O nome não pode ser vazio'})
//   @IsOptional()
//   nome: string;

//   @IsEmail(undefined,{message: 'Email inválido'})
//   @IsString()
//   @IsNotEmpty()
//   @EmailUnico({message: 'Email já cadastrado'})
//   @IsOptional()
//   email: string;

//   @IsNotEmpty({message: 'Telefone não pode ser vazio'})
//   @IsString()
//   @IsOptional()
//   telefone: string;

//   @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   @SenhaForte({message: 'A senha deve ser mais forte'})
//   senha: string;

// }

import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senhaForte.validator";

export class AlteraUsuarioDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @ApiPropertyOptional({
    example: "Maria Oliveira",
    description: "Nome completo do usuário",
  })
  nome?: string;

  @IsEmail(undefined, { message: "Email inválido" })
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  @EmailUnico({ message: "Email já cadastrado" })
  @ApiPropertyOptional({
    example: "maria.oliveira@email.com",
    description: "Novo endereço de e-mail (deve ser único e válido)",
  })
  email?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "Telefone não pode ser vazio" })
  @ApiPropertyOptional({
    example: "(11) 98888-7777",
    description: "Número de telefone do usuário",
  })
  telefone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "A senha não pode ser vazia" })
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  @SenhaForte({ message: "A senha deve ser mais forte" })
  @ApiPropertyOptional({
    example: "NovaSenha@123",
    description: "Nova senha do usuário (mínimo 6 caracteres e forte)",
  })
  senha?: string;
}
