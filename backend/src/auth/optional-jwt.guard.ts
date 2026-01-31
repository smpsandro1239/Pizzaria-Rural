import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status?: any,
  ): TUser {
    // Retorna o utilizador se autenticado, caso contrário null
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user || null;
  }
}
