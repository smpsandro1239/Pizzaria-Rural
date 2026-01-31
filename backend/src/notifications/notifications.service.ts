import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendWhatsApp(to: string, message: string) {
    this.logger.log(`Enviando WhatsApp para ${to}: ${message}`);
    // No mundo real, usaríamos Twilio ou similar
    return await Promise.resolve(true);
  }

  async sendEmail(to: string, subject: string, body: string) {
    this.logger.log(`Enviando Email para ${to}: [${subject}] ${body}`);
    // No mundo real, usaríamos Nodemailer ou similar
    return await Promise.resolve(true);
  }

  async notifyOrderStatus(
    phone: string,
    email: string,
    orderId: string,
    status: string,
  ) {
    const statusMessages: Record<string, string> = {
      PENDING: 'Recebida',
      PREPARING: 'A preparar',
      BAKING: 'No forno',
      ON_THE_WAY: 'A caminho',
      DELIVERED: 'Entregue',
    };

    const message = `Pizzaria Rural: A sua encomenda #${orderId} está agora no estado: ${statusMessages[status] || status}.`;

    await this.sendWhatsApp(phone, message);
    await this.sendEmail(
      email,
      'Estado da sua Encomenda - Pizzaria Rural',
      message,
    );
  }
}
