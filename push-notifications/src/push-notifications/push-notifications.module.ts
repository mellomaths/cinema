import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka.module';
import { PushNotificationsController } from './push-notifications.controller';
import { PushNotificationsService } from './push-notifications.service';

@Module({
  imports: [KafkaModule.register()],
  controllers: [PushNotificationsController],
  providers: [PushNotificationsService],
})
export class PushNotificationsModule {}
