import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as pizzas' })
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Listar pizzas em destaque' })
  findFeatured() {
    return this.pizzasService.findFeatured();
  }

  @Get('sizes')
  @ApiOperation({ summary: 'Listar tamanhos disponíveis' })
  getSizes() {
    return this.pizzasService.getSizes();
  }

  @Get('crusts')
  @ApiOperation({ summary: 'Listar tipos de massa disponíveis' })
  getCrusts() {
    return this.pizzasService.getCrusts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma pizza' })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova pizza (ADMIN)' })
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzasService.create(createPizzaDto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar uma pizza (ADMIN)' })
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzasService.update(id, updatePizzaDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar uma pizza (ADMIN)' })
  remove(@Param('id') id: string) {
    return this.pizzasService.remove(id);
  }
}
