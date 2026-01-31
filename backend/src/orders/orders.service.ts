import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PaymentsService } from '../payments/payments.service';
import { MbwayService } from '../payments/mbway.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private paymentsService: PaymentsService,
    private mbwayService: MbwayService,
  ) {}

  async create(userId: string | null, data: CreateOrderDto) {
    const {
      items,
      address,
      phone,
      delivery,
      couponCode,
      usePoints,
      paymentMethod,
    } = data;

    // Calcular subtotal e validar preços da base de dados
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const pizza = await this.prisma.pizza.findUnique({
        where: { id: item.pizzaId },
        include: {
          sizes: true,
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });
      if (!pizza) {
        throw new NotFoundException(
          `Pizza com ID ${item.pizzaId} não encontrada`,
        );
      }

      // Validar e descontar stock de ingredientes
      for (const pi of pizza.ingredients) {
        if (pi.ingredient.stock < item.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para o ingrediente ${pi.ingredient.name}`,
          );
        }

        await this.prisma.ingredient.update({
          where: { id: pi.ingredientId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      let itemPrice = pizza.basePrice;
      let sizeName = 'Média'; // Padrão

      if (item.sizeId) {
        const size = pizza.sizes.find((s) => s.id === item.sizeId);
        if (!size) {
          throw new NotFoundException(
            `Tamanho com ID ${item.sizeId} não encontrado para esta pizza`,
          );
        }
        itemPrice = size.price;
        sizeName = size.name;
      }

      let itemExtrasTotal = 0;
      const itemExtrasData = [];

      if (item.extras && Array.isArray(item.extras)) {
        for (const extraId of item.extras) {
          const extra = await this.prisma.extra.findUnique({
            where: { id: extraId },
          });
          if (!extra) {
            throw new NotFoundException(
              `Extra com ID ${extraId} não encontrado`,
            );
          }
          itemExtrasTotal += extra.price;
          itemExtrasData.push({
            extraId: extra.id,
            unitPrice: extra.price,
          });
        }
      }

      const unitPrice = itemPrice + itemExtrasTotal;
      subtotal += unitPrice * item.quantity;

      orderItemsData.push({
        pizzaId: pizza.id,
        quantity: item.quantity,
        unitPrice: itemPrice, // Preço base do tamanho
        sizeName: sizeName,
        extras: {
          create: itemExtrasData,
        },
      });
    }

    let total = subtotal;
    let couponId: string | null = null;

    // 1. Aplicar Cupão
    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon || !coupon.active) {
        throw new BadRequestException('Cupão inválido ou inativo');
      }

      if (coupon.validUntil && coupon.validUntil < new Date()) {
        throw new BadRequestException('Cupão expirado');
      }

      if (coupon.minOrder && subtotal < coupon.minOrder) {
        throw new BadRequestException(
          `Valor mínimo de encomenda para este cupão é ${(coupon.minOrder / 100).toFixed(2)}€`,
        );
      }

      couponId = coupon.id;
      if (coupon.discountType === 'PERCENT') {
        total = subtotal - (subtotal * coupon.value) / 100;
      } else if (coupon.discountType === 'FIXED') {
        total = Math.max(0, subtotal - coupon.value);
      }
    }

    // 2. Aplicar Pontos de Fidelização
    let pointsToUse = 0;
    if (usePoints && userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('Utilizador não encontrado');

      if (usePoints > user.points) {
        throw new BadRequestException(
          `Não tens pontos suficientes. Saldo: ${user.points}`,
        );
      }

      pointsToUse = usePoints;
      const pointDiscount = pointsToUse; // 1 ponto = 1 cêntimo
      total = Math.max(0, total - pointDiscount);
    }

    // Criar encomenda
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        address,
        phone,
        delivery,
        status: 'PENDING',
        couponId,
        usedPoints: pointsToUse,
        items: {
          create: orderItemsData,
        },
        payment: {
          create: {
            method: paymentMethod || 'CASH',
            amount: total,
            status: 'PENDING',
          },
        },
      },
      include: {
        items: {
          include: {
            extras: {
              include: {
                extra: true,
              },
            },
          },
        },
        coupon: true,
        payment: true,
      },
    });

    // Se for cartão, gerar clientSecret para o Stripe
    let stripeClientSecret: string | null = null;
    if (paymentMethod === 'CARD') {
      const result = await this.paymentsService.createPaymentIntent(
        order.id,
        total,
      );
      stripeClientSecret = result.clientSecret;
    }

    // Se for MBWAY, disparar pedido
    if (paymentMethod === 'MBWAY') {
      await this.mbwayService.createPayment(order.id, total, phone);
    }

    // Atualizar saldo de pontos do utilizador
    let userEmail = '';
    if (userId) {
      // Remover pontos usados e adicionar novos (1€ faturado = 1 ponto)
      const pointsGained = Math.floor(total / 100);
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: pointsGained - pointsToUse,
          },
        },
      });
      userEmail = user.email;
    }

    // Notificar criação
    await this.notificationsService.notifyOrderStatus(
      phone,
      userEmail,
      order.id,
      'PENDING',
    );

    return {
      ...order,
      stripeClientSecret,
    };
  }

  async validateCoupon(code: string, subtotal: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon || !coupon.active) {
      throw new BadRequestException('Cupão inválido ou inativo');
    }

    if (coupon.validUntil && coupon.validUntil < new Date()) {
      throw new BadRequestException('Cupão expirado');
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      throw new BadRequestException(
        `Valor mínimo de encomenda para este cupão é ${(coupon.minOrder / 100).toFixed(2)}€`,
      );
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENT') {
      discount = (subtotal * coupon.value) / 100;
    } else if (coupon.discountType === 'FIXED') {
      discount = coupon.value;
    }

    return {
      valid: true,
      discount,
      total: Math.max(0, subtotal - discount),
      coupon,
    };
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            pizza: true,
            extras: {
              include: {
                extra: true,
              },
            },
          },
        },
        coupon: true,
        payment: true,
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
            extras: {
              include: {
                extra: true,
              },
            },
          },
        },
        coupon: true,
        payment: true,
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
}
