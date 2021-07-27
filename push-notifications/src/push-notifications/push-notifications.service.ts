import { Injectable, Logger } from '@nestjs/common';
import { KafkaMessageDTO } from 'src/infrastructure/dto/kafka-message.dto';
import { PushNotificationsDto } from './dto/push-notifications.dto';

@Injectable()
export class PushNotificationsService {
  private readonly logger = new Logger('PushNotificationsService');

  sendPushNotification(message: KafkaMessageDTO<PushNotificationsDto>) {
    const { body: notification, requestId } = message;
    this.logger.log(
      `For Request ID: ${requestId} Send push notification to ${notification.phone} with message ${notification.message}.`,
    );
  }
}
