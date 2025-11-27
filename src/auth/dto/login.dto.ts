import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {

  // --------------------------------------------
  // ❌ Versão antiga (sem mensagens personalizadas)
  // --------------------------------------------
  //
  // @ApiProperty({ example: "joao@email.com" })
  // @IsEmail()
  // @IsNotEmpty()
  // email: string;

  // --------------------------------------------
  // ✅ Versão nova — mensagens padronizadas
  // --------------------------------------------
  @ApiProperty({
    example: "joao@email.com",
    description: "E-mail do usuário para login",
  })
  @IsEmail({}, { message: "Email inválido" })
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  email: string;

  // --------------------------------------------
  // ❌ Versão antiga
  // --------------------------------------------
  //
  // @ApiProperty({ example: "Senha@123" })
  // @IsString()
  // @IsNotEmpty()
  // senha: string;

  // --------------------------------------------
  // ✅ Versão nova — mensagens padronizadas
  // --------------------------------------------
  @ApiProperty({
    example: "Senha@123",
    description: "Senha do usuário para login",
  })
  @IsString({ message: "A senha deve ser uma string" })
  @IsNotEmpty({ message: "A senha não pode ser vazia" })
  senha: string;
}
