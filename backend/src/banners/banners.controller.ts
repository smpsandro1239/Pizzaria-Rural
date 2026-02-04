import { Controller, Get } from '@nestjs/common';
import { BannersService } from './banners.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os banners ativos' })
  findAll() {
    return this.bannersService.findAll();
  }
}
