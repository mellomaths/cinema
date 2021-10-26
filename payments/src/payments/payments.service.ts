import { Injectable, Logger } from '@nestjs/common';
import { OrderDto } from 'src/orders/dto/order.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  async validateOrder(order: OrderDto) {}
}
