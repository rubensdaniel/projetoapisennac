import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuardFull extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // erro interno
    if (err) {
      throw err;
    }

    // token inválido ou ausente
    if (!user) {
      throw new UnauthorizedException('Token inválido ou ausente');
    }

    // token expirado
    if (info && info.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token expirou — realize login novamente');
    }

    return user;
  }
}
