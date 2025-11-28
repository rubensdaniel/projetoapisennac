import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RetornoPadraoDTO } from 'src/usuario/dto/retornoPadrao.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dados: LoginDTO): Promise<RetornoPadraoDTO> {
    const resultado = await this.authService.validarLogin(dados.email, dados.senha);

    if (!resultado) {
      return {
        data: null,
        message: 'Email ou senha inválidos',
      };
    }

    return {
      data: resultado,
      message: 'Login realizado com sucesso',
    };
  }
}
