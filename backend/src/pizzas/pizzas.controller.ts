import { Controller, Get, Param, Query } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as pizzas com filtros opcionais' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Preço mínimo em cêntimos' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Preço máximo em cêntimos' })
  @ApiQuery({ name: 'ingredient', required: false, type: String, description: 'Filtrar por nome de ingrediente' })
  findAll(
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('ingredient') ingredient?: string,
  ) {
    return this.pizzasService.findAll({
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      ingredient,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma pizza' })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }
}
