import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { MediaCreateDTO, MediaDTO } from './dto/media.dto';
import { Media, MediaRepository } from './models/media.model';

@Injectable()
export class MediasService {
  private readonly logger = new Logger('MediasService');

  public constructor(
    private readonly kafkaService: KafkaService,
    @InjectModel(Media.name)
    private readonly mediasRepository: MediaRepository,
  ) {}

  async registerNewMedia(
    mediaToRegister: MediaCreateDTO,
    requestId: string,
  ): Promise<void> {
    const media = await this.mediasRepository.create(mediaToRegister);
    await media.save();
    this.logger.log(
      `Registering media ${media.title} of type ${media.type} with id=${media._id}`,
    );
    this.kafkaService.NewMediaRegistered(media, requestId);
  }

  async findMediaById(id: string): Promise<MediaDTO> {
    this.logger.log(`Searching for media by its id=${id}.`);
    const media = await this.mediasRepository.findById(id);
    if (!media) {
      throw new NotFoundException(`Media id=${id} was not found.`);
    }

    return media.toJSON();
  }

  async findMedias(): Promise<MediaDTO[]> {
    this.logger.log(`Searching all medias registered.`);
    const medias = await this.mediasRepository.find();
    return medias.map((media) => media.toJSON());
  }
}
