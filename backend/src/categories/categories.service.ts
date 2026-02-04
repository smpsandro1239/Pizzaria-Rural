import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        pizzas: {
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
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        pizzas: true,
      },
    });
  }
}
