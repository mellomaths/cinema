import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaService } from 'src/infrastructure/kafka.service';
import { OrderCreateDto } from './dto/order.dto';
import { Order, OrderRepository } from './models/order.model';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrdersService');

  public constructor(
    private readonly kafkaService: KafkaService,
    @InjectModel(Order.name) private readonly ordersRepository: OrderRepository,
  ) {}

  async registerNewOrder(orderToRegister: OrderCreateDto, requestId: string) {
    this.logger.log(
      `For Request ID ${requestId}, Registering order for ${orderToRegister.customerId}.`,
    );
    const order = await this.ordersRepository.create(orderToRegister);
    await order.save();
    this.kafkaService.NewOrderPurchased(order, requestId);
  }
}
