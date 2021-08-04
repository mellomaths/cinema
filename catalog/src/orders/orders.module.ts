import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { MediasModule } from 'src/medias/medias.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [KafkaModule.register(), MediasModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
