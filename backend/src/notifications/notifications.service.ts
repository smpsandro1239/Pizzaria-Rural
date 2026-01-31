import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly resendApiKey = process.env.RESEND_API_KEY;

  async sendWhatsApp(to: string, message: string) {
    this.logger.log(`[WhatsApp] Para ${to}: ${message}`);

    if (process.env.WHATSAPP_API_KEY) {
      // Integração real aqui futuramente
      // await fetch('https://api.whatsapp.com/...', { ... })
    }

    return await Promise.resolve(true);
  }

  async sendEmail(to: string, subject: string, body: string) {
    if (this.resendApiKey) {
      this.logger.log(`[Resend] Enviando email real para ${to}`);
      // Simulação de chamada de API do Resend
      // await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${this.resendApiKey}`, 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ from: 'Pizzaria Rural <onboarding@resend.dev>', to, subject, html: body })
      // });
    } else {
      this.logger.log(`[Email Mock] Para ${to}: [${subject}] ${body}`);
    }

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

    const estadoPt = statusMessages[status] || status;
    const message = `Pizzaria Rural 🍕: A sua encomenda #${orderId} está agora no estado: ${estadoPt}.`;

    await this.sendWhatsApp(phone, message);

    if (email) {
      const emailHtml = `
        <h1>Olá!</h1>
        <p>A sua encomenda <strong>#${orderId}</strong> na Pizzaria Rural foi atualizada.</p>
        <p>Estado atual: <strong>${estadoPt}</strong></p>
        <br/>
        <p>Obrigado pela preferência!</p>
      `;
      await this.sendEmail(
        email,
        'Estado da sua Encomenda - Pizzaria Rural',
        emailHtml,
      );
    }
  }
}
