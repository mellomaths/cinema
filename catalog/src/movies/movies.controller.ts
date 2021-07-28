import { Controller, Get, Headers, HttpStatus, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MediaDTO } from 'src/medias/dto/media.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  private readonly logger = new Logger('MediasController');

  public constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies registered.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of movies retrieved.',
    type: MediaDTO,
    isArray: true,
  })
  async getMedias(@Headers('request-id') requestId: string) {
    this.logger.log(`Received request to find all movies registered.`);
    this.logger.log(`Request ID: ${requestId}.`);
    return this.moviesService.findMovies();
  }
}
