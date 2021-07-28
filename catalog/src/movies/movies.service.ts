import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MediaDTO, MediaType } from 'src/medias/dto/media.dto';
import { Media, MediaRepository } from 'src/medias/models/media.model';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger('MediasService');

  public constructor(
    @InjectModel(Media.name)
    private readonly mediasRepository: MediaRepository,
  ) {}

  async findMovies(): Promise<MediaDTO[]> {
    this.logger.log(`Searching all movies registered.`);
    const medias = await this.mediasRepository.find({
      type: MediaType[MediaType.MOVIE],
    });
    return medias.map((media) => media.toJSON());
  }
}
