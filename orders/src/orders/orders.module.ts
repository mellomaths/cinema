import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [KafkaModule.register()],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
