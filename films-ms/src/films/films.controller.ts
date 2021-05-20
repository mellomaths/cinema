import { Body, Controller, Headers, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FilmCreateDTO } from './dto/film-create.dto';

@Controller('films')
export class FilmsController {
  private readonly logger = new Logger('FilmsController');

  @Post()
  @ApiOperation({ summary: 'Register a new film in the Cinema.' })
  @ApiBody({ type: FilmCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Film successfully created.',
    type: FilmCreateDTO,
  })
  registerNewFilm(
    @Body() filmCreatedDto: FilmCreateDTO,
    @Headers('request-id') requestId: string,
  ) {
    this.logger.log('Received payload: ' + JSON.stringify(filmCreatedDto));
    this.logger.log(`Request ID: ${requestId}`);
    return { ok: true };
  }
}
