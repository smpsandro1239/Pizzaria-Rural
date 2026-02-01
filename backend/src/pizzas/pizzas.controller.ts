import { Controller, Get, Param, Query } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as pizzas com filtros opcionais' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Pesquisar por nome ou descrição',
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    description: 'Preço mínimo em cêntimos',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    description: 'Preço máximo em cêntimos',
  })
  @ApiQuery({
    name: 'ingredientId',
    required: false,
    description: 'Filtrar por ingrediente específico',
  })
  findAll(
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('ingredientId') ingredientId?: string,
  ) {
    return this.pizzasService.findAll({
      search,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      ingredientId,
    });
  }

  @Get('extras')
  @ApiOperation({ summary: 'Listar todos os extras disponíveis' })
  findAllExtras() {
    return this.pizzasService.findAllExtras();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma pizza (inclui reviews)' })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }
}
