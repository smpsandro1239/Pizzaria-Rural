import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const totalOrders = await this.prisma.order.count();

    const salesData = await this.prisma.order.aggregate({
      _sum: {
        total: true,
      },
      _avg: {
        total: true,
      },
    });

    const totalSales = salesData._sum.total || 0;
    const averageTicket = salesData._avg.total || 0;

    // Pizzas mais vendidas
    const topPizzas = await this.prisma.orderItem.groupBy({
      by: ['pizzaId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    // Enriquecer com nomes das pizzas
    const topPizzasWithDetails = await Promise.all(
      topPizzas.map(async (item) => {
        const pizza = await this.prisma.pizza.findUnique({
          where: { id: item.pizzaId },
          select: { name: true },
        });
        return {
          name: pizza?.name || 'Desconhecida',
          quantity: item._sum.quantity,
        };
      }),
    );

    // Utilização de cupões
    const couponUsage = await this.prisma.order.count({
      where: {
        couponId: { not: null },
      },
    });

    // Pontos totais redimidos
    const totalPointsRedeemed = await this.prisma.order.aggregate({
      _sum: {
        usedPoints: true,
      },
    });

    return {
      totalOrders,
      totalSales: (totalSales / 100).toFixed(2) + '€',
      averageTicket: (averageTicket / 100).toFixed(2) + '€',
      topPizzas: topPizzasWithDetails,
      couponUsage,
      totalPointsRedeemed: totalPointsRedeemed._sum.usedPoints || 0,
    };
  }

  async getDailySales() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyOrders = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const totalSales = dailyOrders.reduce((sum, order) => sum + order.total, 0);

    return {
      date: today.toLocaleDateString('pt-PT'),
      count: dailyOrders.length,
      total: (totalSales / 100).toFixed(2) + '€',
    };
  }
}
