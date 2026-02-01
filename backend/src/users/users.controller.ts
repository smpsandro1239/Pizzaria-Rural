import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil do utilizador atual' })
  async getMe(@Request() req: RequestWithUser) {
    const user = await this.usersService.findOneById(req.user.userId);
    if (!user) throw new NotFoundException('Utilizador não encontrado');
    return user;
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Alterar a password do utilizador' })
  async changePassword(
    @Request() req: RequestWithUser,
    @Body('password') newPassword: string,
  ) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.usersService.update(req.user.userId, {
      password: hashedPassword,
    });
  }
}
