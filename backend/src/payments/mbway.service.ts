import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MbwayService {
  private readonly logger = new Logger(MbwayService.name);
  private readonly mbwayKey = process.env.IFTHENPAY_MBWAY_KEY;

  constructor(private prisma: PrismaService) {}

  async createPayment(orderId: string, amount: number, phone: string) {
    this.logger.log(
      `[MBWAY] Iniciando pedido para encomenda ${orderId} - Telemóvel: ${phone} - Valor: ${amount / 100}€`,
    );

    if (!this.mbwayKey) {
      this.logger.warn(
        'IFTHENPAY_MBWAY_KEY não definida. MBWAY em modo simulado.',
      );
      return await Promise.resolve({
        success: true,
        message: 'Pedido MBWAY simulado enviado',
        requestId: 'sim_mbway_123',
      });
    }

    // No mundo real, faríamos a chamada à API da IfThenPay
    // const response = await fetch(`https://www.ifthenpay.com/api/mbway/request?key=${this.mbwayKey}&mbwaykey=${this.mbwayKey}&orderid=${orderId}&amount=${amount/100}&phone=${phone}`);
    // const data = await response.json();

    return await Promise.resolve({
      success: true,
      requestId: 'real_mbway_api_id',
    });
  }

  async confirmPayment(orderId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment) {
      this.logger.error(`Pagamento não encontrado para encomenda ${orderId}`);
      return;
    }

    await this.prisma.payment.update({
      where: { orderId },
      data: { status: 'PAID' },
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PREPARING' },
    });

    this.logger.log(`[MBWAY] Pagamento confirmado para encomenda ${orderId}`);
  }
}
