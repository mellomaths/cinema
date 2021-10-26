import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaIncomingMessage } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { OrderDto } from './dto/order.dto';

@Controller()
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  @MessagePattern('new.order.purchased')
  getNewOrderMessage(@Payload() event: KafkaIncomingMessage<OrderDto>) {
    this.logger.log(event);
  }
}
