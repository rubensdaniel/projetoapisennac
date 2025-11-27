import { Column, Entity, PrimaryColumn } from "typeorm";
// import * as bcrypt from "bcrypt"; // ❌ entidade não deve ter regras de hash

@Entity('usuario') // adicionando nome da tabela
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

  // 🔥 Novo campo necessário para o login e sistema admin/usuário
  @Column({ length: 20, default: 'usuario' })
  TIPO: string;

  // -------------------------------------------------------------
  // ❌ CONSTRUTOR ANTIGO (faz hash dentro da entidade) — REMOVIDO
  // -------------------------------------------------------------
  //
  // constructor(
  //   id?: string,
  //   nome?: string,
  //   email?: string,
  //   telefone?: string,
  //   senha?: string
  // ) {
  //   if (id && nome && email && telefone && senha) {
  //     const saltOrRounds = 10;
  //     this.ID = id;
  //     this.NOME = nome;
  //     this.EMAIL = email;
  //     this.TELEFONE = telefone;
  //     this.SENHA = bcrypt.hashSync(senha, saltOrRounds);
  //   }
  // }

  // -------------------------------------------------------------
  // ❌ MÉTODO trocarSenha — deve ficar no SERVICE, não na entidade
  // -------------------------------------------------------------
  //
  // trocarSenha(novaSenha: string) {
  //   const saltOrRounds = 10;
  //   this.SENHA = bcrypt.hashSync(novaSenha, saltOrRounds);
  // }

  // -------------------------------------------------------------
  // ❌ MÉTODO login — regra de negócio não fica em entidade
  // -------------------------------------------------------------
  //
  // login(senha: string): boolean {
  //   return bcrypt.compareSync(senha, this.SENHA);
  // }
}
