import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova encomenda' })
  create(@Body() createOrderDto: any, @Request() req: any) {
    // Se houver um token JWT, o userId estará em req.user.userId via OptionalJwtGuard
    const userId = req.user ? req.user.userId : null;
    return this.ordersService.create(userId, createOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('my-orders')
  @ApiOperation({ summary: 'Listar encomendas do utilizador autenticado' })
  findAllByUser(@Request() req: any) {
    return this.ordersService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes/tracking de uma encomenda' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar o estado de uma encomenda (Admin)' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Post('validate-coupon')
  @ApiOperation({ summary: 'Validar um cupão de desconto' })
  validateCoupon(@Body('code') code: string, @Body('subtotal') subtotal: number) {
    return this.ordersService.validateCoupon(code, subtotal);
  }
}
