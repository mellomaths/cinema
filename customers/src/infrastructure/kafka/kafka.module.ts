import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Module({ imports: [ConfigModule.forRoot()], exports: [KafkaService] })
export class KafkaModule {
  static register(): DynamicModule {
    const m = ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'customers',
            brokers: process.env.KAFKA_BROKERS.split(','),
          },
          consumer: {
            groupId: 'customers-consumer',
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]);
    m.exports.push(KafkaService);
    return m;
  }
}
