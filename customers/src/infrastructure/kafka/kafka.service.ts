import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Customer } from 'src/customers/models/customer.model';
import { KafkaMessageDTO } from './dto/kafka-message.dto';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('KafkaService');

  private readonly topic = {
    NewCustomerRegistered: process.env.KAFKA_NEW_CUSTOMER_REGISTERED_TOPIC,
  };

  public constructor(
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(this.topic.NewCustomerRegistered);
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

  NewCustomerRegistered(data: Customer, requestId: string) {
    const message = this.createKafkaMessage(data.toJSON(), requestId);
    this.sendMessageToTopic(this.topic.NewCustomerRegistered, message);
  }
}
