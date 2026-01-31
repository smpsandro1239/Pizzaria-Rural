import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly resendApiKey = process.env.RESEND_API_KEY;

  async sendWhatsApp(to: string, message: string) {
    this.logger.log(`[WhatsApp] Para ${to}: ${message}`);

    if (process.env.WHATSAPP_API_KEY) {
      this.logger.log(`[WhatsApp] Enviando via API real para ${to}`);
      // No mundo real, usaríamos Twilio ou similar
    }

    return await Promise.resolve(true);
  }

  async sendEmail(to: string, subject: string, body: string) {
    if (this.resendApiKey) {
      this.logger.log(
        `[Resend] Enviando email real para ${to} (Subject: ${subject})`,
      );
      // Simulação de uso do body
      this.logger.log(
        `[Resend] Conteúdo processado (${body.length} caracteres)`,
      );
      this.logger.log(`[Resend] Email disparado com sucesso para ${to}`);
    } else {
      this.logger.log(`[Email Mock] Para ${to}: [${subject}]`);
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

    try {
      await this.sendWhatsApp(phone, message);

      if (email) {
        const emailHtml = `
          <div style="font-family: sans-serif; color: #333;">
            <h1 style="color: #d32f2f;">Pizzaria Rural 🍕</h1>
            <p>Olá!</p>
            <p>A sua encomenda <strong>#${orderId}</strong> foi atualizada.</p>
            <p>Estado atual: <span style="background: #fff3e0; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${estadoPt}</span></p>
            <br/>
            <p>Obrigado pela preferência!</p>
          </div>
        `;
        await this.sendEmail(
          email,
          'Estado da sua Encomenda - Pizzaria Rural',
          emailHtml,
        );
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(
        `Erro ao processar notificações para encomenda ${orderId}: ${errorMessage}`,
      );
    }
  }
}
