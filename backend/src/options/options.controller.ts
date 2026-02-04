import { Controller, Get } from '@nestjs/common';
import { OptionsService } from './options.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar opções de personalização (Tamanhos, Massas, Extras)' })
  findAll() {
    return this.optionsService.findAll();
  }
}
