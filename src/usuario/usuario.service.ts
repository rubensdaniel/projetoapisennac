import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { USUARIO } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { RetornoPadraoDTO } from "./dto/retornoPadrao.dto";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";

import * as bcrypt from "bcrypt";


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
    const hash = await bcrypt.hash(dados.senha, 10);

    const novoUsuario = this.usuarioRepository.create({
      ID: uuid(),
      NOME: dados.nome,
      EMAIL: dados.email,
      TELEFONE: dados.telefone,
      SENHA: hash,
      TIPO: dados.tipo ?? 'usuario',
    });

    await this.usuarioRepository.save(novoUsuario);

    return {
      data: novoUsuario.ID,
      message: "Usuário criado com sucesso",
    };
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizaID(id);

    for (const [chave, valor] of Object.entries(dados)) {
      if (chave === 'id' || valor === undefined) continue;

      if (chave === 'senha') {
        (usuario as any).SENHA = await bcrypt.hash(valor, 10);
      } else if (chave === 'tipo') {
        (usuario as any).TIPO = valor;
      } else {
        (usuario as any)[chave.toUpperCase()] = valor;
      }
    }

    await this.usuarioRepository.save(usuario);

    return {
      data: usuario.ID,
      message: "Usuário alterado com sucesso",
    };
  }

async remover(idToken: string): Promise<RetornoPadraoDTO> {
  const usuario = await this.localizaID(idToken);

  await this.usuarioRepository.remove(usuario);

  return {
    data: usuario.ID,
    message: "Usuário removido com sucesso",
  };
}


}
