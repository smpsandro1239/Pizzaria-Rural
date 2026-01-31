import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateReviewDto) {
    const { pizzaId, rating, comment } = data;

    if (pizzaId) {
      const pizza = await this.prisma.pizza.findUnique({
        where: { id: pizzaId },
      });
      if (!pizza) throw new NotFoundException('Pizza não encontrada');
    }

    return this.prisma.review.create({
      data: {
        userId,
        pizzaId,
        rating,
        comment,
      },
    });
  }

  async findByPizza(pizzaId: string) {
    return this.prisma.review.findMany({
      where: { pizzaId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        user: { select: { name: true } },
        pizza: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
