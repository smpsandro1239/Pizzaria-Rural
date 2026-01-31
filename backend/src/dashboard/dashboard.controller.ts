import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Obter métricas gerais do dashboard' })
  getMetrics() {
    return this.dashboardService.getMetrics();
  }

  @Get('daily')
  @ApiOperation({ summary: 'Obter vendas do dia atual' })
  getDailySales() {
    return this.dashboardService.getDailySales();
  }
}
