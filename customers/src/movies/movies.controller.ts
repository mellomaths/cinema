import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from 'src/customers/customers.service';
import { KafkaIncomingMessage } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { MovieDTO } from './dto/movie.dto';

@Controller()
export class MoviesController {
  private readonly logger = new Logger('MoviesController');

  public constructor(private readonly customersService: CustomersService) {}

  @MessagePattern('new.movie.registered')
  handleNewMovieRegistered(@Payload() message: KafkaIncomingMessage<MovieDTO>) {
    this.logger.log(
      `Received a NewMovieRegistered event with Request ID ${message.value.requestId}`,
    );

    this.customersService.notifyCustomerNewMovieRegistered(message.value);
  }
}
