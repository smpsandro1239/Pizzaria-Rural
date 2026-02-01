import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (stripeSecret) {
      this.stripe = new Stripe(stripeSecret);
    } else {
      this.logger.warn(
        'STRIPE_SECRET_KEY não definida. Pagamentos em modo simulado.',
      );
    }
  }

  async createPaymentIntent(
    orderId: string,
    amount: number,
    currency: string = 'eur',
  ) {
    if (!this.stripe) {
      this.logger.log(
        `[Simulação] Criando PaymentIntent para encomenda ${orderId} no valor de ${amount / 100}€`,
      );
      return { clientSecret: 'pi_simulated_secret_key' };
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { orderId },
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    if (!this.stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      this.logger.warn(
        'Webhook recebido mas Stripe não configurado corretamente.',
      );
      return;
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Erro no webhook do Stripe: ${errorMessage}`);
      throw err;
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await this.confirmPayment(
          paymentIntent.metadata.orderId,
          paymentIntent.id,
        );
        break;
      }
      case 'payment_intent.payment_failed': {
        const failedIntent = event.data.object;
        await this.failPayment(failedIntent.metadata.orderId);
        break;
      }
      default:
        this.logger.log(`Evento do Stripe não processado: ${event.type}`);
    }
  }

  private async confirmPayment(orderId: string, stripeId: string) {
    await this.prisma.payment.update({
      where: { orderId },
      data: {
        status: 'PAID',
      },
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PREPARING',
      },
    });

    this.logger.log(
      `Pagamento confirmado para encomenda ${orderId} (Stripe ID: ${stripeId})`,
    );

    // Emitir evento em tempo real
    this.eventsGateway.emitOrderStatusUpdate(orderId, 'PREPARING');
  }

  private async failPayment(orderId: string) {
    await this.prisma.payment.update({
      where: { orderId },
      data: {
        status: 'FAILED',
      },
    });

    this.logger.warn(`Pagamento falhou para encomenda ${orderId}`);
  }
}
