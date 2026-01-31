import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ingredient.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async updateStock(id: string, quantity: number) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException('Ingrediente não encontrado');
    }

    return this.prisma.ingredient.update({
      where: { id },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }

  async checkStockLevels() {
    return this.prisma.ingredient.findMany({
      where: {
        stock: {
          lt: 10, // Stock baixo se menor que 10
        },
      },
    });
  }
}
