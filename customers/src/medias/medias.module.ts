import { Module } from '@nestjs/common';
import { CustomersModule } from 'src/customers/customers.module';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { MediasController } from './medias.controller';

@Module({
  imports: [KafkaModule.register(), CustomersModule],
  controllers: [MediasController],
})
export class MediasModule {}
