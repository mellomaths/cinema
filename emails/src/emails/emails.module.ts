import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka.module';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [KafkaModule.register()],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
