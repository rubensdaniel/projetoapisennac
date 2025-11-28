import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validarLogin(email: string, senha: string) {
    let usuario;
    try {
      usuario = await this.usuarioService.localizaEmail(email);
    } catch (e) {
      return null; // email não encontrado
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.SENHA);
    if (!senhaCorreta) return null;

    const token = this.jwtService.sign({
      id: usuario.ID,
      tipo: usuario.TIPO,
    });

    return {
      id: usuario.ID,
      nome: usuario.NOME,
      email: usuario.EMAIL,
      tipo: usuario.TIPO,
      token,
    };
  }
}
