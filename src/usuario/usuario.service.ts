// import { Injectable } from "@nestjs/common";
// import { UsuarioEntity } from "./usuario.entity";

// @Injectable()
// export class UsuariosArmazenados{
//     #usuarios: UsuarioEntity[] = [];  

//     AdicionarUsuario(usuario: UsuarioEntity){
//             this.#usuarios.push(usuario);
        
//     }

//     async validaEmail(email: string): Promise<boolean>{
//         const usuarioEncontrado = this.#usuarios.find(u => u.email === email);
//         return usuarioEncontrado !== undefined;
//     }

//     private BuscaPorID(id: string): UsuarioEntity {
//         const possivelUsuario = this.#usuarios.find(
//             usuarioSalvo => usuarioSalvo.id === id
//         );

//         if (!possivelUsuario) {
//             throw new Error('Usuário não encontrado');
//         }
//         return possivelUsuario;
//     }

//     async removeUsuario(id: string) {
//         const usuario = this.BuscaPorID(id);

//         this.#usuarios = this.#usuarios.filter(
//             usuarioSalvo => usuarioSalvo.id !== id
//         );

//         return usuario;
//     }
 
//     async atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>) {
//         var possivelUsuario = this.BuscaPorID(id);

//         Object.entries(dadosAtualizacao).forEach(
//             ([chave, valor]) => {
//                 if (chave === 'id') {
//                     return;
//                 }else if (valor === undefined) {
//                     return;

//                 }
//                 possivelUsuario[chave] = valor;
//             }
//         );

//         return possivelUsuario;
//     }

//     get Usuarios(){        
//         return this.#usuarios;
//     }
// }

import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { USUARIO } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { RetornoPadraoDTO } from "./dto/retornoPadrao.dto";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly usuarioRepository: Repository<USUARIO>,
  ) {}

  async listarTodos(): Promise<USUARIO[]> {
    return this.usuarioRepository.find();
  }

  async localizaID(id: string): Promise<USUARIO> {
    const usuario = await this.usuarioRepository.findOne({ where: { ID: id } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return usuario;
  }

  async localizaEmail(email: string): Promise<USUARIO> {
    const usuario = await this.usuarioRepository.findOne({ where: { EMAIL: email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return usuario;
  }

  async emailExistente(email: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOne({ where: { EMAIL: email } });
    return !!usuario;
  }

  async inserir(dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
    const novoUsuario = new USUARIO(
      uuid(),
      dados.nome,
      dados.email,
      dados.telefone,
      dados.senha,
    );

    return this.usuarioRepository.save(novoUsuario)
      .then(() => {
        return {
          data: novoUsuario.ID,
          message: "Usuário criado com sucesso",
        };
      })
      .catch((error) => {
        throw new Error(`Erro ao inserir usuário: ${error.message}`);
      });
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizaID(id);

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id' || valor === undefined) return;
      (usuario as any)[chave.toUpperCase()] = valor;
    });

    return this.usuarioRepository.save(usuario)
      .then(() => {
        return {
          data: usuario.ID,
          message: "Usuário alterado com sucesso",
        };
      })
      .catch((error) => {
        throw new Error(`Erro ao alterar usuário: ${error.message}`);
      });
  }

  async remover(id: string): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizaID(id);

    return this.usuarioRepository.remove(usuario)
      .then(() => {
        return {
          data: usuario.ID,
          message: "Usuário removido com sucesso",
        };
      })
      .catch((error) => {
        throw new Error(`Erro ao remover usuário: ${error.message}`);
      });
  }
}
