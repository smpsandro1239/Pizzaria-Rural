import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MbwayService } from './mbway.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  providers: [PaymentsService, MbwayService],
  controllers: [PaymentsController],
  exports: [PaymentsService, MbwayService],
})
export class PaymentsModule {}
