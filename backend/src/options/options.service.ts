import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const sizes = await this.prisma.pizzaSize.findMany();
    const crusts = await this.prisma.crustType.findMany();
    const ingredients = await this.prisma.ingredient.findMany({
        where: { stock: { gt: 0 } }
    });
    return { sizes, crusts, ingredients };
  }
}
