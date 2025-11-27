import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AlteraUsuarioDTO } from './dto/alteraUsuario.dto';
import { RetornoPadraoDTO } from './dto/retornoPadrao.dto';
import { ApiTags } from '@nestjs/swagger';
import { USUARIO } from './usuario.entity';

// ▼ Novo DTO de login
import { LoginDTO } from '../auth/dto/login.dto';

@Controller('/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // --------------------------------------------
  // ❌ ANTIGO (estava retornando 2 mensagens duplicadas)
  // --------------------------------------------
  //
  // @Post()
  // async criaUsuario(@Body() dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
  //   const novoUsuario = await this.usuarioService.inserir(dados);
  //
  //   return {
  //     data: novoUsuario,
  //     message: 'Usuário criado com sucesso',
  //   };
  // }

  // --------------------------------------------
  // ✅ NOVO — retorno padronizado e correto
  // --------------------------------------------
  @Post()
  async criaUsuario(@Body() dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
    const retorno = await this.usuarioService.inserir(dados);

    return {
      data: retorno.data,
      message: retorno.message,
    };
  }

  @Get('listar')
  async listarUsuarios(): Promise<RetornoPadraoDTO> {
    const usuarios = await this.usuarioService.listarTodos();

    const lista = usuarios.map(
      (u: USUARIO) => new ListaUsuarioDTO(u.ID, u.NOME, u.EMAIL),
    );

    return {
      data: lista,
      message: 'Lista de usuários retornada com sucesso',
    };
  }

  @Put(':id')
  async alterarUsuario(
    @Param('id') id: string,
    @Body() dados: AlteraUsuarioDTO,
  ): Promise<RetornoPadraoDTO> {
    const retorno = await this.usuarioService.alterar(id, dados);

    return {
      data: retorno.data,
      message: retorno.message,
    };
  }

  @Delete(':id')
  async removerUsuario(@Param('id') id: string): Promise<RetornoPadraoDTO> {
    const retorno = await this.usuarioService.remover(id);

    return {
      data: retorno.data,
      message: retorno.message,
    };
  }

  // --------------------------------------------
  // ⭐ NOVO ENDPOINT — LOGIN DO USUÁRIO
  // --------------------------------------------
  @Post('login')
  async login(@Body() dados: LoginDTO): Promise<RetornoPadraoDTO> {
    const usuario = await this.usuarioService.validarCredenciais(
      dados.email,
      dados.senha,
    );

    if (!usuario) {
      return {
        data: null,
        message: 'Email ou senha inválidos',
      };
    }

    const token = this.usuarioService.gerarToken(usuario);

    return {
      data: {
        id: usuario.ID,
        nome: usuario.NOME,
        email: usuario.EMAIL,
        tipo: usuario.TIPO,
        token: token,
      },
      message: 'Login realizado com sucesso',
    };
  }
}
