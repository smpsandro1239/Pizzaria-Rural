import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { pizzaId: string; rating: number; comment?: string }) {
    if (data.rating < 1 || data.rating > 5) {
      throw new BadRequestException('A avaliação deve ser entre 1 e 5 estrelas.');
    }

    // Verificar se o utilizador já avaliou esta pizza
    const existing = await this.prisma.review.findFirst({
      where: { userId, pizzaId: data.pizzaId },
    });

    if (existing) {
      return this.prisma.review.update({
        where: { id: existing.id },
        data: { rating: data.rating, comment: data.comment },
      });
    }

    return this.prisma.review.create({
      data: {
        userId,
        pizzaId: data.pizzaId,
        rating: data.rating,
        comment: data.comment,
      },
    });
  }

  async findByPizza(pizzaId: string) {
    return this.prisma.review.findMany({
      where: { pizzaId },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
