import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    const userId = req.user ? req.user.userId : null;
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get('validate-coupon')
  @ApiOperation({ summary: 'Validar um cupão de desconto' })
  @ApiQuery({ name: 'code', description: 'Código do cupão' })
  @ApiQuery({ name: 'subtotal', description: 'Subtotal em cêntimos', type: Number })
  validateCoupon(@Query('code') code: string, @Query('subtotal') subtotal: string) {
    return this.ordersService.validateCoupon(code, parseInt(subtotal));
  }

  @UseGuards(JwtAuthGuard)
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
}
