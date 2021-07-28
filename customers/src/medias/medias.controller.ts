import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from 'src/customers/customers.service';
import { KafkaIncomingMessage } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { MediaDTO } from './dto/media.dto';

@Controller()
export class MediasController {
  private readonly logger = new Logger('MediasController');

  public constructor(private readonly customersService: CustomersService) {}

  @MessagePattern('new.media.registered')
  handleNewMovieRegistered(@Payload() message: KafkaIncomingMessage<MediaDTO>) {
    this.logger.log(
      `Received a NewMediaRegistered event with Request ID ${message.value.requestId}`,
    );

    this.customersService.notifyCustomerNewMediaRegistered(message.value);
  }
}
