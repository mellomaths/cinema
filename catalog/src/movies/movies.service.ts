import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessageDTO } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { MovieCreateDTO } from './dto/movie-create.dto';

@Injectable()
export class MoviesService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('MoviesService');
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

  registerNewMovie(movieToRegister: MovieCreateDTO, requestId: string) {
    const message = new KafkaMessageDTO();
    message.requestId = requestId;
    message.body = movieToRegister;
    this.clientKafka
      .send('NewMovieRegistered', JSON.stringify(message))
      .subscribe();
  }
}
