import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string | null, data: any) {
    const { items, address, phone, delivery, couponCode } = data;

    return this.prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const orderItemsData = [];
      const ingredientUpdates: Record<string, number> = {};

      for (const item of items) {
        const pizza = await tx.pizza.findUnique({
          where: { id: item.pizzaId },
          include: { ingredients: { include: { ingredient: true } } },
        });

        if (!pizza) {
          throw new NotFoundException(`Pizza com ID ${item.pizzaId} não encontrada`);
        }

        for (const pi of pizza.ingredients) {
          const required = item.quantity;
          const currentStock = pi.ingredient.stock;
          const alreadyPlanned = ingredientUpdates[pi.ingredientId] || 0;

          if (currentStock - alreadyPlanned < required) {
            throw new BadRequestException(
              `Stock insuficiente para o ingrediente ${pi.ingredient.name} na pizza ${pizza.name}`,
            );
          }

          ingredientUpdates[pi.ingredientId] = alreadyPlanned + required;
        }

        const itemTotal = pizza.price * item.quantity;
        subtotal += itemTotal;

        orderItemsData.push({
          pizzaId: pizza.id,
          quantity: item.quantity,
          unitPrice: pizza.price,
        });
      }

      // Validar Cupão
      let discount = 0;
      let appliedCoupon = null;

      if (couponCode) {
        appliedCoupon = await tx.coupon.findUnique({ where: { code: couponCode } });
        if (!appliedCoupon || !appliedCoupon.active) {
          throw new BadRequestException('Cupão inválido ou expirado.');
        }
        if (subtotal < appliedCoupon.minOrderValue) {
          throw new BadRequestException(`O valor mínimo para este cupão é ${appliedCoupon.minOrderValue / 100}€.`);
        }

        if (appliedCoupon.type === 'PERCENT') {
          discount = Math.floor((subtotal * appliedCoupon.value) / 100);
        } else if (appliedCoupon.type === 'FIXED') {
          discount = appliedCoupon.value;
        }
      }

      const total = Math.max(0, subtotal - discount);

      // Decrementar stock
      for (const [ingredientId, amount] of Object.entries(ingredientUpdates)) {
        await tx.ingredient.update({
          where: { id: ingredientId },
          data: { stock: { decrement: amount } },
        });
      }

      // Criar encomenda
      const order = await tx.order.create({
        data: {
          userId,
          total,
          address,
          phone,
          delivery,
          couponCode,
          discount,
          status: 'PENDING',
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
          user: true,
        },
      });

      // Atribuir pontos se o utilizador estiver autenticado
      if (userId) {
        await tx.user.update({
          where: { id: userId },
          data: {
            points: {
              increment: Math.floor(total / 100),
            },
          },
        });
      }

      const userEmail = order.user?.email || '';
      await this.notificationsService.notifyOrderStatus(phone, userEmail, order.id, 'PENDING');

      return order;
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            pizza: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            pizza: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Encomenda não encontrada');
    }

    return order;
  }

  async updateStatus(id: string, status: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: { user: true },
    });

    await this.notificationsService.notifyOrderStatus(
      order.phone,
      order.user?.email || '',
      order.id,
      status,
    );

    return order;
  }

  async validateCoupon(code: string, subtotal: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.active) {
      throw new BadRequestException('Cupão inválido ou expirado.');
    }
    if (subtotal < coupon.minOrderValue) {
      throw new BadRequestException(`O valor mínimo para este cupão é ${coupon.minOrderValue / 100}€.`);
    }

    let discount = 0;
    if (coupon.type === 'PERCENT') {
      discount = Math.floor((subtotal * coupon.value) / 100);
    } else if (coupon.type === 'FIXED') {
      discount = coupon.value;
    }

    return { code, type: coupon.type, value: coupon.value, discount };
  }
}
