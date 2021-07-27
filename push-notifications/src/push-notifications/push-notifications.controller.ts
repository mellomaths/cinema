import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaIncomingMessage } from 'src/infrastructure/dto/kafka-message.dto';
import { PushNotificationsDto } from './dto/push-notifications.dto';
import { PushNotificationsService } from './push-notifications.service';

@Controller()
export class PushNotificationsController {
  private readonly logger = new Logger('PushNotificationsController');

  public constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @MessagePattern('send.push.notification')
  handleSendPushNotificationsCommand(
    @Payload() message: KafkaIncomingMessage<PushNotificationsDto>,
  ) {
    this.logger.log(
      `Received Push Notifications command with Request ID ${message.value.requestId}`,
    );
    this.pushNotificationsService.sendPushNotification(message.value);
  }
}
