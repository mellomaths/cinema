import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderCreateDto, OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger('OrdersController');

  public constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Purchase a new order.' })
  @ApiBody({ type: OrderCreateDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order successfully purchased.',
    type: OrderDto,
  })
  async postNewOrder(
    @Body() orderCreateDto: OrderCreateDto,
    @Headers('request-id') requestId: string,
  ) {
    this.logger.log(
      `Received request for order purchase with Request ID ${requestId}`,
    );
    this.logger.log(`Received body: ${JSON.stringify(orderCreateDto)}`);
    await this.ordersService.registerNewOrder(orderCreateDto, requestId);
  }
}
