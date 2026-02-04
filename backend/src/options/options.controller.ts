import { Controller, Get } from '@nestjs/common';
import { OptionsService } from './options.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as opções de personalização' })
  findAll() {
    return this.optionsService.findAll();
  }

  @Get('crusts')
  @ApiOperation({ summary: 'Listar apenas tipos de massa (Crusts)' })
  findCrusts() {
    return this.optionsService.findCrusts();
  }

  @Get('ingredients')
  @ApiOperation({ summary: 'Listar apenas ingredientes extra' })
  findIngredients() {
    return this.optionsService.findIngredients();
  }

  @Get('sizes')
  @ApiOperation({ summary: 'Listar apenas tamanhos de pizza' })
  findSizes() {
    return this.optionsService.findSizes();
  }
}
