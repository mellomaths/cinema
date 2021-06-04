import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [KafkaModule.register()],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
