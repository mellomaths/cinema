import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EmailNotificationDto } from 'src/emails/dto/email-notification.dto';
import { KafkaMessageDTO } from './dto/kafka-message.dto';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('KafkaService');

  private readonly topic = {
    SendEmail: process.env.KAFKA_SEND_EMAIL_TOPIC,
    SendPushNotification: process.env.KAFKA_SEND_PUSH_NOTIFICATION_TOPIC,
  };

  public constructor(
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(this.topic.SendEmail);
    this.clientKafka.subscribeToResponseOf(this.topic.SendPushNotification);
    await this.clientKafka.connect();
  }

  async onModuleDestroy() {
    await this.clientKafka.close().catch((e) => this.logger.error(e));
  }

  private createKafkaMessage(data: any, requestId: string) {
    const message = new KafkaMessageDTO<any>();
    message.body = data;
    message.requestId = requestId;
    return message;
  }

  private sendMessageToTopic(topic: string, data: KafkaMessageDTO<any>) {
    this.clientKafka.send(topic, data.stringify()).subscribe();
  }

  SendEmail(data: EmailNotificationDto, requestId: string) {
    const message = this.createKafkaMessage(data, requestId);
    this.sendMessageToTopic(this.topic.SendEmail, message);
  }
}
