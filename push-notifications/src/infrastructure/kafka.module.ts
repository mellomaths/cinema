import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Module({ imports: [ConfigModule.forRoot()], exports: [KafkaService] })
export class KafkaModule {
  static config(): ClientProviderOptions {
    const config: ClientProviderOptions = {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'push-notifications',
          brokers: process.env.KAFKA_BROKERS.split(','),
        },
        consumer: {
          groupId: 'push-notifications-consumer',
        },
        producer: {
          allowAutoTopicCreation: true,
        },
      },
    };

    return config;
  }

  static register(): DynamicModule {
    const config = this.config();
    const m = ClientsModule.register([config]);
    m.exports.push(KafkaService);
    return m;
  }
}
