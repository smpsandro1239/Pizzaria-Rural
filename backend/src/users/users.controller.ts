import { Controller, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil do utilizador autenticado' })
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findOneById(req.user.userId);
    if (!user) {
      throw new NotFoundException('Utilizador não encontrado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user as any;
    return result;
  }
}
