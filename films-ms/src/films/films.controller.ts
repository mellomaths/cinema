import { Body, Controller, Logger, Post } from '@nestjs/common';
import { FilmCreateDTO } from './dto/film-create.dto';

@Controller('films')
export class FilmsController {
  private readonly logger = new Logger('FilmsController');

  @Post()
  postFilm(@Body() filmCreatedDto: FilmCreateDTO) {
    this.logger.log('Received payload: ' + JSON.stringify(filmCreatedDto));
    return { ok: true };
  }
}
