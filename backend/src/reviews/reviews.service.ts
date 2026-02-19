import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { pizzaId: string, rating: number, comment?: string, userName: string }) {
    return this.prisma.review.create({
      data,
    });
  }

  async findAllByPizza(pizzaId: string) {
    return this.prisma.review.findMany({
      where: { pizzaId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
