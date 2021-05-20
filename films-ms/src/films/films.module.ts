import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka/config/kafka.module';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [KafkaModule.register()],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
