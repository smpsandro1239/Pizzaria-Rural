import { InvoicesService } from "../invoices/invoices.service";
import { EventsGateway } from "../events/events.gateway";
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private eventsGateway: EventsGateway,
    private invoicesService: InvoicesService,
  ) {}

  async create(userId: string | null, data: any) {
    const { items, address, phone, delivery, couponCode } = data;

    return this.prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const orderItemsToCreate = [];
      const ingredientUpdates: Record<string, number> = {};

      for (const item of items) {
        const pizza = await tx.pizza.findUnique({
          where: { id: item.pizzaId },
          include: { ingredients: { include: { ingredient: true } } },
        });

        if (!pizza) {
          throw new NotFoundException(`Pizza com ID ${item.pizzaId} não encontrada`);
        }

        // 1. Validar e somar preço base da pizza
        let itemUnitPrice = pizza.price;

        // 2. Validar Tamanho
        let sizeExtra = 0;
        if (item.sizeId) {
            const size = await tx.pizzaSize.findUnique({ where: { id: item.sizeId } });
            if (!size) throw new BadRequestException('Tamanho inválido.');
            sizeExtra = size.extraPrice;
        }

        // 3. Validar Massa
        let crustExtra = 0;
        if (item.crustId) {
            const crust = await tx.crustType.findUnique({ where: { id: item.crustId } });
            if (!crust) throw new BadRequestException('Tipo de massa inválido.');
            crustExtra = crust.extraPrice;
        }

        itemUnitPrice += sizeExtra + crustExtra;

        // 4. Validar Extras e Stock
        const extrasData = [];
        if (item.extras && Array.isArray(item.extras)) {
            for (const extra of item.extras) {
                const ingredient = await tx.ingredient.findUnique({ where: { id: extra.ingredientId } });
                if (!ingredient) throw new BadRequestException('Ingrediente extra inválido.');

                const qty = extra.quantity || 1;
                itemUnitPrice += ingredient.extraPrice * qty;

                extrasData.push({
                    ingredientId: ingredient.id,
                    quantity: qty,
                    priceAtOrder: ingredient.extraPrice
                });

                // Reservar stock para os extras
                ingredientUpdates[ingredient.id] = (ingredientUpdates[ingredient.id] || 0) + (qty * item.quantity);
            }
        }

        // Reservar stock para os ingredientes base da pizza
        for (const pi of pizza.ingredients) {
          ingredientUpdates[pi.ingredientId] = (ingredientUpdates[pi.ingredientId] || 0) + (item.quantity);
        }

        subtotal += itemUnitPrice * item.quantity;

        orderItemsToCreate.push({
          pizzaId: pizza.id,
          sizeId: item.sizeId,
          crustId: item.crustId,
          quantity: item.quantity,
          unitPrice: itemUnitPrice,
          extras: {
            create: extrasData
          }
        });
      }

      // Validar Stock Final
      for (const [ingredientId, totalNeeded] of Object.entries(ingredientUpdates)) {
        const ing = await tx.ingredient.findUnique({ where: { id: ingredientId } });
        if (!ing) throw new BadRequestException('Ingrediente não encontrado.');
        if (ing.stock < totalNeeded) {
          throw new BadRequestException(`Stock insuficiente para ${ing.name}. Necessário ${totalNeeded}, disponível ${ing.stock}.`);
        }
        await tx.ingredient.update({
          where: { id: ingredientId },
          data: { stock: { decrement: totalNeeded } }
        });
      }

      // 5. Validar Cupão
      let discount = 0;
      if (couponCode) {
        const appliedCoupon = await tx.coupon.findUnique({ where: { code: couponCode } });
        if (!appliedCoupon || !appliedCoupon.active) throw new BadRequestException('Cupão inválido.');
        if (subtotal < appliedCoupon.minOrderValue) throw new BadRequestException('Valor mínimo não atingido para o cupão.');

        if (appliedCoupon.type === 'PERCENT') discount = Math.floor((subtotal * appliedCoupon.value) / 100);
        else if (appliedCoupon.type === 'FIXED') discount = appliedCoupon.value;
      }

      const total = Math.max(0, subtotal - discount);

      // 6. Criar Encomenda
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
            create: orderItemsToCreate.map(it => ({
                ...it,
                extras: it.extras
            }))
          },
        },
        include: {
          items: { include: { extras: true } },
          user: true,
        },
      });

      // Atribuir pontos
      if (userId) {
        await tx.user.update({
          where: { id: userId },
          data: { points: { increment: Math.floor(total / 100) } },
        });
      }

      await this.notificationsService.notifyOrderStatus(phone, order.user?.email || '', order.id, 'PENDING');
      this.eventsGateway.emitOrderStatusUpdate(order.id, 'PENDING');

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
            size: true,
            crust: true,
            extras: { include: { ingredient: true } }
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            pizza: true,
            size: true,
            crust: true,
            extras: { include: { ingredient: true } }
          },
        },
      },
    });
    if (!order) throw new NotFoundException('Encomenda não encontrada');
    return order;
  }

  async updateStatus(id: string, status: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: { user: true, items: { include: { extras: true } } },
    });

    await this.notificationsService.notifyOrderStatus(order.phone, order.user?.email || '', order.id, status);
    this.eventsGateway.emitOrderStatusUpdate(order.id, status);

    if (status === "DELIVERED") {
      try {
        await this.invoicesService.generateInvoice(order);
      } catch (error) {
        console.error("Erro ao gerar fatura:", error);
      }
    }

    return order;
  }

  async validateCoupon(code: string, subtotal: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.active) throw new BadRequestException('Cupão inválido.');
    if (subtotal < coupon.minOrderValue) throw new BadRequestException('Valor mínimo não atingido.');

    let discount = 0;
    if (coupon.type === 'PERCENT') discount = Math.floor((subtotal * coupon.value) / 100);
    else if (coupon.type === 'FIXED') discount = coupon.value;

    return { code, type: coupon.type, value: coupon.value, discount };
  }
}
