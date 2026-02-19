import { Controller, Post, Body } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post('validate')
  @ApiOperation({ summary: 'Validar um código promocional' })
  validate(@Body('code') code: string, @Body('orderValue') orderValue: number) {
    return this.couponsService.validate(code, orderValue);
  }
}
