import { Module } from '@nestjs/common';
import { CustomersModule } from 'src/customers/customers.module';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { MoviesController } from './movies.controller';

@Module({
  imports: [KafkaModule.register(), CustomersModule],
  controllers: [MoviesController],
})
export class MoviesModule {}
