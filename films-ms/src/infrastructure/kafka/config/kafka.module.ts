import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({ imports: [ConfigModule.forRoot()] })
export class KafkaModule {
  static register(): DynamicModule {
    return ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'films-ms',
            brokers: process.env.KAFKA_BROKERS.split(','),
          },
          consumer: {
            groupId: 'films-ms-consumer',
          },
        },
      },
    ]);
  }
}
