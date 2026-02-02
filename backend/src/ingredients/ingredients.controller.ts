import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('ingredients')
@Controller('ingredients')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os ingredientes e respetivo stock (Admin)',
  })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Atualizar stock de um ingrediente (Admin)' })
  updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
    @Body('reason') reason?: string,
  ) {
    return this.ingredientsService.updateStock(id, quantity, reason);
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Listar ingredientes com stock baixo (Admin)' })
  checkLowStock() {
    return this.ingredientsService.checkStockLevels();
  }

  @Get('movements')
  @ApiOperation({
    summary: 'Listar histórico de movimentações de stock (Admin)',
  })
  @ApiQuery({ name: 'ingredientId', required: false })
  getMovements(@Query('ingredientId') ingredientId?: string) {
    return this.ingredientsService.getMovements(ingredientId);
  }
}
