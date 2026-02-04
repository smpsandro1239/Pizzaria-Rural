import { Controller, Get, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as pizzas' })
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma pizza' })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }
}
