import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MbwayService } from './mbway.service';

@Module({
  providers: [PaymentsService, MbwayService],
  controllers: [PaymentsController],
  exports: [PaymentsService, MbwayService],
})
export class PaymentsModule {}
