import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MediaMongooseModule } from './models/media.model';

@Module({
  imports: [KafkaModule.register(), MediaMongooseModule.register()],
  controllers: [MediasController],
  providers: [MediasService],
  exports: [MediaMongooseModule.register(), MediasService],
})
export class MediasModule {}
