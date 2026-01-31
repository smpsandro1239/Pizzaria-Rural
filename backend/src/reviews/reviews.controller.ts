import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto } from './dto/create-review.dto';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submeter uma avaliação' })
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: RequestWithUser,
  ) {
    return this.reviewsService.create(req.user.userId, createReviewDto);
  }

  @Get('pizza/:pizzaId')
  @ApiOperation({ summary: 'Obter avaliações de uma pizza' })
  findByPizza(@Param('pizzaId') pizzaId: string) {
    return this.reviewsService.findByPizza(pizzaId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as avaliações (Admin/Geral)' })
  findAll() {
    return this.reviewsService.findAll();
  }
}
