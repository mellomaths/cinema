import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaIncomingMessage } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { MediasService } from 'src/medias/medias.service';
import { OrderDto } from './dto/order.dto';

@Controller()
export class OrdersController {
  private readonly logger = new Logger('OrdersController');

  public constructor(private readonly mediasService: MediasService) {}

  @MessagePattern('new.order.purchased')
  async registerMediaPurchased(
    @Payload() event: KafkaIncomingMessage<OrderDto>,
  ) {
    const { value: message } = event;
    this.logger.log(
      `Received NewOrderPurchased event with Request ID ${message.requestId}`,
    );
    const { medias } = message.body;
    medias.forEach(async (media) => {
      await this.mediasService.incrementMediaOrdersCount(
        media.id,
        message.requestId,
      );
    });
  }
}
