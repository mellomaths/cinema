import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaMessageDTO } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { MovieCreateDTO } from './dto/movie-create.dto';
import { Movie, MovieRepository } from './models/movie.model';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger('MoviesService');
  public constructor(
    private readonly kafkaService: KafkaService,
    @InjectModel(Movie.name)
    private readonly movieRepository: MovieRepository,
  ) {}

  registerNewMovie(movieToRegister: MovieCreateDTO, requestId: string) {
    this.kafkaService.NewMovieRegistered(movieToRegister, requestId);
  }
}
