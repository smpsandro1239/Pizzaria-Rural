import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventsModule } from '../events/events.module';
import { InvoicesModule } from '../invoices/invoices.module';

@Module({
  imports: [NotificationsModule, EventsModule, InvoicesModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
