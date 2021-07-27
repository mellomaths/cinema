import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaIncomingMessage } from 'src/infrastructure/dto/kafka-message.dto';
import { EmailNotificationDto } from './dto/email-notification.dto';
import { EmailsService } from './emails.service';

@Controller()
export class EmailsController {
  private readonly logger = new Logger('EmailsController');

  public constructor(private readonly emailsService: EmailsService) {}

  @MessagePattern('send.email')
  handleSendEmailCommand(
    @Payload() message: KafkaIncomingMessage<EmailNotificationDto>,
  ) {
    this.logger.log(
      `Received a SendEmail command with Request ID: ${message.value.requestId}`,
    );
    this.emailsService.sendEmail(message.value);
  }
}
