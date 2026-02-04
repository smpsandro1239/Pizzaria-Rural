import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PizzasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pizza.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
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
      },
    });
  }
}
