import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senhaForte.validator";

export class CriaUsuarioDTO {
  @IsString()
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  nome: string;

  @IsEmail(undefined,{message: 'Email inválido'})
  @IsString()
  @IsNotEmpty()
  @EmailUnico({message: 'Email já cadastrado'})
  email: string;

  @IsNotEmpty({message: 'Telefone não pode ser vazio'})
  @IsString()
  telefone: string;

  @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
  @IsNotEmpty()
  @IsString()
  @SenhaForte({message: 'A senha deve ser mais forte'})
  senha: string;

}