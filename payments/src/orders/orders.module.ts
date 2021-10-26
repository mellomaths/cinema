import { Module } from '@nestjs/common';
import { PaymentsModule } from 'src/payments/payments.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [PaymentsModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
