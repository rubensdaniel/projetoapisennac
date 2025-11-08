// import * as bcrypt from "bcrypt";

// export class UsuarioEntity{
//     id: string;
//     nome: string;
//     email: string;
//     telefone: string;
//     senha: string;
//     constructor(
//         id: string, 
//         nome: string, 
//         email: string, 
//         telefone:string,
//         senha:string
//     ){
//         var saltOrRounds = 10;
//         this.id = id;
//         this.nome = nome;
//         this.email = email;
//         this. telefone = telefone;
//         this.senha = bcrypt.hashSync(senha, saltOrRounds);
//     }
//         trocarSenha(novaSenha: string){
//         var saltOrRounds = 10;
//         this.senha = bcrypt.hashSync(novaSenha, saltOrRounds); 
//     }

//     login(senha: string): boolean{
//         return bcrypt.compareSync(senha, this.senha);
//     }
// }

import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class USUARIO {
  @PrimaryColumn()
  ID: string;

  @Column({ length: 255 })
  NOME: string;

  @Column({ length: 255, unique: true })
  EMAIL: string;

  @Column({ length: 20 })
  TELEFONE: string;

  @Column({ length: 255 })
  SENHA: string;

  constructor(
    id?: string,
    nome?: string,
    email?: string,
    telefone?: string,
    senha?: string
  ) {
    if (id && nome && email && telefone && senha) {
      const saltOrRounds = 10;
      this.ID = id;
      this.NOME = nome;
      this.EMAIL = email;
      this.TELEFONE = telefone;
      this.SENHA = bcrypt.hashSync(senha, saltOrRounds);
    }
  }

  trocarSenha(novaSenha: string) {
    const saltOrRounds = 10;
    this.SENHA = bcrypt.hashSync(novaSenha, saltOrRounds);
  }

  login(senha: string): boolean {
    return bcrypt.compareSync(senha, this.SENHA);
  }
}
