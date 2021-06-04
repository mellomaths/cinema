import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  async registerNewMovie(movieToRegister: MovieCreateDTO, requestId: string) {
    const movie = await this.movieRepository.create(movieToRegister);
    await movie.save();
    this.kafkaService.NewMovieRegistered(movie, requestId);
  }
}
