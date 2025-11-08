// export class ListaUsuarioDTO{
//     constructor(
//             readonly id: string, 
//             readonly nome:string,
//             readonly email: string
//     ){}
// }

import { ApiProperty } from "@nestjs/swagger";

export class ListaUsuarioDTO {
  @ApiProperty({
    example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    description: "Identificador único do usuário",
  })
  readonly id: string;

  @ApiProperty({
    example: "João Silva",
    description: "Nome completo do usuário",
  })
  readonly nome: string;

  @ApiProperty({
    example: "joao.silva@email.com",
    description: "Endereço de e-mail do usuário",
  })
  readonly email: string;

  constructor(id: string, nome: string, email: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }
}
