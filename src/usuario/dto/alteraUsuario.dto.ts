import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senhaForte.validator";

export class AlteraUsuarioDTO {
  @IsString()
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  @IsOptional()
  nome: string;

  @IsEmail(undefined,{message: 'Email inválido'})
  @IsString()
  @IsNotEmpty()
  @EmailUnico({message: 'Email já cadastrado'})
  @IsOptional()
  email: string;

  @IsNotEmpty({message: 'Telefone não pode ser vazio'})
  @IsString()
  @IsOptional()
  telefone: string;

  @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @SenhaForte({message: 'A senha deve ser mais forte'})
  senha: string;

}