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
    const { items, address, phone, delivery } = data;

    // Calcular total e validar preços da base de dados
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const pizza = await this.prisma.pizza.findUnique({ where: { id: item.pizzaId } });
      if (!pizza) {
        throw new NotFoundException(`Pizza com ID ${item.pizzaId} não encontrada`);
      }

      const itemTotal = pizza.price * item.quantity;
      total += itemTotal;

      orderItemsData.push({
        pizzaId: pizza.id,
        quantity: item.quantity,
        unitPrice: pizza.price, // Preço oficial da base de dados
      });
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
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // Atribuir pontos se o utilizador estiver autenticado
    let userEmail = '';
    if (userId) {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: Math.floor(total / 100), // 1€ = 1 ponto (preços em cêntimos)
          },
        },
      });
      userEmail = user.email;
    }

    // Notificar criação
    await this.notificationsService.notifyOrderStatus(phone, userEmail, order.id, 'PENDING');

    return order;
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
}
