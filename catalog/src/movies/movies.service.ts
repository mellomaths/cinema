import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { MovieCreateDTO, MovieDTO } from './dto/movie-create.dto';
import { Movie, MovieRepository } from './models/movie.model';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger('MoviesService');
  public constructor(
    private readonly kafkaService: KafkaService,
    @InjectModel(Movie.name)
    private readonly movieRepository: MovieRepository,
  ) {}

  async registerNewMovie(
    movieToRegister: MovieCreateDTO,
    requestId: string,
  ): Promise<void> {
    const movie = await this.movieRepository.create(movieToRegister);
    await movie.save();
    this.kafkaService.NewMovieRegistered(movie, requestId);
  }

  async findMovieById(id: string): Promise<MovieDTO> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie id=${id} was not found.`);
    }

    return movie.toJSON();
  }

  async findMovies(): Promise<MovieDTO[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => movie.toJSON());
  }
}
