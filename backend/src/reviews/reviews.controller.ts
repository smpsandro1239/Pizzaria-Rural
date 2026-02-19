import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Submeter uma avaliação para uma pizza' })
  create(@Body() data: { pizzaId: string, rating: number, comment?: string, userName: string }) {
    return this.reviewsService.create(data);
  }

  @Get('pizza/:pizzaId')
  @ApiOperation({ summary: 'Listar todas as avaliações de uma pizza' })
  findAllByPizza(@Param('pizzaId') pizzaId: string) {
    return this.reviewsService.findAllByPizza(pizzaId);
  }
}
