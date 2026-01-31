import {
  Controller,
  Post,
  Headers,
  Req,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MbwayService } from './mbway.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import type { Request } from 'express';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly mbwayService: MbwayService,
  ) {}

  @Post('webhook')
  @ApiOperation({ summary: 'Webhook para eventos do Stripe' })
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('Faltando stripe-signature');
    }

    if (!req.rawBody) {
      throw new BadRequestException('Faltando corpo bruto da requisição');
    }

    await this.paymentsService.handleWebhook(signature, req.rawBody);
    return { received: true };
  }

  @Get('mbway/callback')
  @ApiOperation({
    summary: 'Callback para confirmação de pagamento MBWAY (IfThenPay)',
  })
  async mbwayCallback(
    @Query('orderid') orderId: string,
    @Query('status') status: string,
  ) {
    // Nota: A IfThenPay envia parâmetros via query string
    if (status === '000') {
      // 000 é sucesso na IfThenPay
      await this.mbwayService.confirmPayment(orderId);
    }
    return { received: true };
  }
}
