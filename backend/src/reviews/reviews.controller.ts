import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submeter uma avaliação (Requer autenticação)' })
  async create(@Request() req: any, @Body() body: { pizzaId: string; rating: number; comment?: string }) {
    return this.reviewsService.create(req.user.userId, body);
  }

  @Get('pizza/:pizzaId')
  @ApiOperation({ summary: 'Listar avaliações de uma pizza' })
  async findByPizza(@Param('pizzaId') pizzaId: string) {
    return this.reviewsService.findByPizza(pizzaId);
  }
}
