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

  async updateStock(
    id: string,
    quantity: number,
    reason: string = 'REPOSIÇÃO',
  ) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException('Ingrediente não encontrado');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.ingredient.update({
        where: { id },
        data: {
          stock: {
            increment: quantity,
          },
        },
      });

      await tx.stockMovement.create({
        data: {
          ingredientId: id,
          quantity: quantity,
          reason: reason,
        },
      });

      return updated;
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

  async getMovements(ingredientId?: string) {
    return this.prisma.stockMovement.findMany({
      where: ingredientId ? { ingredientId } : {},
      include: { ingredient: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
