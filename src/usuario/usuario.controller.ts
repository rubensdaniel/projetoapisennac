// import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
// import { UsuarioEntity } from "./usuario.entity";
// import { UsuariosArmazenados } from "./usuario.dm";
// import {v4 as uuid} from 'uuid';
// import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
// import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
// import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";

// @Controller('/usuarios')
// export class UsuarioController {
//   constructor(private Usuarios : UsuariosArmazenados){

//   }

//   @Post()
//   async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {    
//     var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.email,
//                             dadosUsuario.telefone,dadosUsuario.senha);
    
    
//     this.Usuarios.AdicionarUsuario(novoUsuario);
//     var retorno = {
//         novoUsuario,
//         message: 'Usuário criado com sucesso'
//     };
//     return retorno;
//   }

//   @Get()
//   async retornaUsuario(): Promise<ListaUsuarioDTO[]> {

//       var usuariosListados = this.Usuarios.Usuarios;
//       const ListaRetorno = usuariosListados.map(
//           usuario => new ListaUsuarioDTO(
//               usuario.id,
//               usuario.nome,
//               usuario.email
//           )
//       );
//       return ListaRetorno;
//   }

//   @Put('/:id')
//   async alteraUsuario(@Param('id') id: string, @Body() dadosAtualizacao: AlteraUsuarioDTO) {
//       const usuarioAtualizado = await this.Usuarios.atualizaUsuario(id, dadosAtualizacao);
//       return {
//           usuario: usuarioAtualizado,
//           message: 'Usuário atualizado com sucesso'
//       };
//   }

//   @Delete('/:id')
//   async removeUsuario(@Param('id') id: string) {
//       const usuarioRemovido = await this.Usuarios.removeUsuario(id);
//       return {
//           usuario: usuarioRemovido,
//           message: 'Usuário removido com sucesso'
//       };
//   }
// }

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AlteraUsuarioDTO } from './dto/alteraUsuario.dto';
import { RetornoPadraoDTO } from './dto/retornoPadrao.dto';
import { ApiTags } from '@nestjs/swagger';
import { USUARIO } from './usuario.entity';

@Controller('/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
    const novoUsuario = await this.usuarioService.inserir(dados);

    return {
      data: novoUsuario,
      message: 'Usuário criado com sucesso',
    };
  }

  @Get('listar')
  async listarUsuarios(): Promise<RetornoPadraoDTO> {
    const usuarios = await this.usuarioService.listarTodos();

    // converte para o DTO de listagem
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
    const usuarioAtualizado = await this.usuarioService.alterar(id, dados);

    return {
      data: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete(':id')
  async removerUsuario(@Param('id') id: string): Promise<RetornoPadraoDTO> {
    const usuarioRemovido = await this.usuarioService.remover(id);

    return {
      data: usuarioRemovido,
      message: 'Usuário removido com sucesso',
    };
  }
}
