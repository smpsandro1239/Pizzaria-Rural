import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pizza.findMany({
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async findFeatured() {
    return this.prisma.pizza.findMany({
      where: { featured: true },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
      take: 6,
    });
  }

  async findOne(id: string) {
    const pizza = await this.prisma.pizza.findUnique({
      where: { id },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    if (!pizza) throw new NotFoundException('Pizza não encontrada');
    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto) {
    const { ingredientIds, ...data } = createPizzaDto;
    return this.prisma.pizza.create({
      data: {
        ...data,
        ingredients: {
          create: ingredientIds?.map((id) => ({
            ingredient: { connect: { id } },
          })),
        },
      },
    });
  }

  async update(id: string, updatePizzaDto: UpdatePizzaDto) {
    const { ingredientIds, ...data } = updatePizzaDto;

    if (ingredientIds) {
      await this.prisma.pizzaIngredient.deleteMany({
        where: { pizzaId: id },
      });
    }

    return this.prisma.pizza.update({
      where: { id },
      data: {
        ...data,
        ingredients: ingredientIds ? {
          create: ingredientIds.map((ingId) => ({
            ingredient: { connect: { id: ingId } },
          })),
        } : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.pizzaIngredient.deleteMany({
      where: { pizzaId: id },
    });
    return this.prisma.pizza.delete({
      where: { id },
    });
  }
}
