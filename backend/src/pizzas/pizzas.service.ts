import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PizzasService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: {
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    ingredientId?: string;
  }) {
    const { minPrice, maxPrice, search, ingredientId } = query || {};

    return this.prisma.pizza.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search } },
                  { description: { contains: search } },
                ],
              }
            : {},
          minPrice ? { basePrice: { gte: minPrice } } : {},
          maxPrice ? { basePrice: { lte: maxPrice } } : {},
          ingredientId
            ? {
                ingredients: {
                  some: {
                    ingredientId: ingredientId,
                  },
                },
              }
            : {},
        ],
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        sizes: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.pizza.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        sizes: true,
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { name: true } } },
        },
      },
    });
  }

  async findAllExtras() {
    return this.prisma.extra.findMany();
  }
}
