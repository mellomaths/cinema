import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieCreateDTO, MovieDTO } from './dto/movie-create.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  private readonly logger = new Logger('MoviesController');

  public constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new movie in the Cinema.' })
  @ApiBody({ type: MovieCreateDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movie successfully created.',
    type: MovieCreateDTO,
  })
  async registerNewMovie(
    @Body() movieCreatedDto: MovieCreateDTO,
    @Headers('request-id') requestId: string,
  ) {
    this.logger.log('Received payload: ' + JSON.stringify(movieCreatedDto));
    this.logger.log(`Request ID: ${requestId}`);
    await this.moviesService.registerNewMovie(movieCreatedDto, requestId);
    return { ok: true };
  }

  @Get(':id')
  @ApiOperation({ summary: "Get Movie information by it's id." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie found.',
    type: MovieDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found.',
  })
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.findMovieById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies registered' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movie successfully created.',
    type: MovieDTO,
    isArray: true,
  })
  async getMovies() {
    return this.moviesService.findMovies();
  }
}
