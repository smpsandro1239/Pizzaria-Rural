import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PizzasService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: { minPrice?: number; maxPrice?: number; ingredient?: string }) {
    const where: any = {};

    if (filters?.minPrice || filters?.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = filters.minPrice;
      if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }

    if (filters?.ingredient) {
      where.ingredients = {
        some: {
          ingredient: {
            name: {
              contains: filters.ingredient,
            },
          },
        },
      };
    }

    return this.prisma.pizza.findMany({
      where,
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
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
        reviews: true,
      },
    });
  }
}
