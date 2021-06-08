import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerCreateDto } from './dto/customer-create.dto';

@Controller('customers')
export class CustomersController {
  private readonly logger = new Logger('CustomersController');

  public constructor(private readonly customersService: CustomersService) {}
  @Post()
  @ApiOperation({ summary: 'Register a new Customer in the Cinema.' })
  @ApiBody({ type: CustomerCreateDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer successfully created.',
    type: CustomerCreateDto,
  })
  async registerNewCostumer(
    @Body() customerCreatedDto: CustomerCreateDto,
    @Headers('request-id') requestId: string,
  ) {
    this.logger.log('Received payload: ' + JSON.stringify(customerCreatedDto));
    this.logger.log(`Request ID: ${requestId}`);
    await this.customersService.registerNewCustomer(
      customerCreatedDto,
      requestId,
    );
    return { ok: true };
  }
}
