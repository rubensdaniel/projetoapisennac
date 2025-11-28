import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AlteraUsuarioDTO } from './dto/alteraUsuario.dto';
import { RetornoPadraoDTO } from './dto/retornoPadrao.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { USUARIO } from './usuario.entity';

// Guard JWT atualizado
import { JwtAuthGuardFull } from 'src/auth/guards/jwt-auth.guard';

@Controller('/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // ============================================================
  // 🔓 ROTA PÚBLICA - CRIAR USUÁRIO
  // ============================================================

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou e-mail já existente',
  })
  async criaUsuario(@Body() dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
    const retorno = await this.usuarioService.inserir(dados);
    return {
      data: retorno.data,
      message: retorno.message,
    };
  }

  // ============================================================
  // 🔐 ROTA PROTEGIDA - LISTAR TODOS
  // ============================================================

  @UseGuards(JwtAuthGuardFull)
  @ApiBearerAuth()
  @Get('listar')
  @ApiOperation({ summary: 'Lista todos os usuários (requer login)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
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

  // ============================================================
  // 🔐 ROTA PROTEGIDA - ALTERAR (manteremos recebendo id por enquanto)
  // ============================================================

  @UseGuards(JwtAuthGuardFull)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({
    summary: 'Altera dados de um usuário',
    description: 'Requer autenticação JWT. Apenas admins deveriam usar com liberdade.',
  })
  @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso' })
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

  // ============================================================
  // 🔐 ROTA PROTEGIDA - REMOVER O PRÓPRIO USUÁRIO
  // ============================================================

  @UseGuards(JwtAuthGuardFull)
  @ApiBearerAuth()
  @Delete('remover')
  @ApiOperation({
    summary: 'Remove o próprio usuário logado',
    description: 'O usuário pode apagar apenas o seu próprio registro.',
  })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Token inválido ou ausente' })
  async removerUsuario(@Req() req): Promise<RetornoPadraoDTO> {
    const usuarioId = req.user.id; // vem do payload do JWT

    const retorno = await this.usuarioService.remover(usuarioId);

    return {
      data: retorno.data,
      message: retorno.message,
    };
  }
}
