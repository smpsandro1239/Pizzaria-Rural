import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { OrdersModule } from './orders/orders.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReviewsModule } from './reviews/reviews.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PaymentsModule } from './payments/payments.module';
import { HealthModule } from './health/health.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PizzasModule,
    OrdersModule,
    NotificationsModule,
    DashboardModule,
    ReviewsModule,
    IngredientsModule,
    PaymentsModule,
    HealthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
