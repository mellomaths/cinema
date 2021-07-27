import { Injectable, Logger } from '@nestjs/common';
import { KafkaMessageDTO } from 'src/infrastructure/dto/kafka-message.dto';
import { EmailNotificationDto } from './dto/email-notification.dto';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger('EmailsService');

  sendEmail(message: KafkaMessageDTO<EmailNotificationDto>) {
    const { body: email, requestId } = message;
    this.logger.log(
      `For Request ID: ${requestId} Sending email to ${email.to} with subject ${email.subject}.`,
    );
  }
}
