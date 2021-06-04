import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MovieCreateDTO } from 'src/movies/dto/movie-create.dto';
import { KafkaMessageDTO } from './dto/kafka-message.dto';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('KafkaService');

  public constructor(
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('NewMovieRegistered');
    await this.clientKafka.connect();
  }

  async onModuleDestroy() {
    await this.clientKafka.close().catch((e) => this.logger.error(e));
  }

  NewMovieRegistered(data: MovieCreateDTO, requestId: string) {
    const message = new KafkaMessageDTO<MovieCreateDTO>();
    message.requestId = requestId;
    message.body = data;
    this.clientKafka
      .send('NewMovieRegistered', message.stringify())
      .subscribe();
  }
}
