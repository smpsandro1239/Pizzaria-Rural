import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const [sizes, crusts, ingredients] = await Promise.all([
        this.prisma.pizzaSize.findMany(),
        this.prisma.crustType.findMany(),
        this.prisma.ingredient.findMany({ where: { stock: { gt: 0 } } })
    ]);
    return { sizes, crusts, ingredients };
  }

  async findCrusts() {
    return this.prisma.crustType.findMany();
  }

  async findIngredients() {
    return this.prisma.ingredient.findMany({
        where: { stock: { gt: 0 } }
    });
  }

  async findSizes() {
    return this.prisma.pizzaSize.findMany();
  }
}
