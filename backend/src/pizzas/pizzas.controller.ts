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

  @Get('extras')
  @ApiOperation({ summary: 'Listar todos os extras disponíveis' })
  findAllExtras() {
    return this.pizzasService.findAllExtras();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma pizza' })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }
}
