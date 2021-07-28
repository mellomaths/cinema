import { Module } from '@nestjs/common';
import { MediasModule } from 'src/medias/medias.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [MediasModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
