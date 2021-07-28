import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { Media, MediaSchema } from './models/media.model';

@Module({
  imports: [
    KafkaModule.register(),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule {}
