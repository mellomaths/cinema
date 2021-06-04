import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieCreateDTO } from './dto/movie-create.dto';
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
}
