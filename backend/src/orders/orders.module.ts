import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { PaymentsModule } from '../payments/payments.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [NotificationsModule, PaymentsModule, EventsModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
