import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { USUARIO } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { RetornoPadraoDTO } from "./dto/retornoPadrao.dto";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";

// ▼ Novo import necessário
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly usuarioRepository: Repository<USUARIO>,

    // ▼ Novo JwtService injetado
    private readonly jwtService: JwtService,
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

  // -------------------------------------------------------------
  // ❌ INSERÇÃO ANTIGA — usava construtor da entidade (INCORRETO)
  // -------------------------------------------------------------
  //
  // async inserir(dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
  //   const novoUsuario = new USUARIO(
  //     uuid(),
  //     dados.nome,
  //     dados.email,
  //     dados.telefone,
  //     dados.senha,
  //   );
  //
  //   return this.usuarioRepository.save(novoUsuario)
  //     .then(() => {
  //       return {
  //         data: novoUsuario.ID,
  //         message: "Usuário criado com sucesso",
  //       };
  //     })
  //     .catch((error) => {
  //       throw new Error(`Erro ao inserir usuário: ${error.message}`);
  //     });
  // }

  // -------------------------------------------------------------
  // ✅ INSERÇÃO CORRETA — hash da senha no SERVICE + suporte a TIPO
  // -------------------------------------------------------------
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

  // 🚀 Para usar await dentro do loop, substituímos Object.entries().forEach
  // por um for...of, porque forEach NÃO permite uso correto de await.
  for (const [chave, valor] of Object.entries(dados)) {
    if (chave === 'id' || valor === undefined) continue;

    // -------------------------------------------------------------
    // ❌ Antes: bcrypt.hashSync(valor, 10) (bloqueava a thread)
    // -------------------------------------------------------------
    //
    // (usuario as any).SENHA = bcrypt.hashSync(valor, 10);

    // -------------------------------------------------------------
    // ✅ Agora: hashing assíncrono e seguro
    // -------------------------------------------------------------
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

  async remover(id: string): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizaID(id);

    await this.usuarioRepository.remove(usuario);

    return {
      data: usuario.ID,
      message: "Usuário removido com sucesso",
    };
  }

  // -------------------------------------------------------------
  // ✅ NOVO MÉTODO — valida credenciais de login
  // -------------------------------------------------------------
  async validarCredenciais(email: string, senha: string): Promise<USUARIO | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { EMAIL: email }
    });

    if (!usuario) return null;

    const senhaValida = await bcrypt.compare(senha, usuario.SENHA);
    if (!senhaValida) return null;

    return usuario;
  }

  // -------------------------------------------------------------
  // ✅ NOVO MÉTODO — gera token JWT com id e tipo
  // -------------------------------------------------------------
  gerarToken(usuario: USUARIO): string {
    const payload = {
      id: usuario.ID,
      tipo: usuario.TIPO,
    };

    return this.jwtService.sign(payload);
  }
}
