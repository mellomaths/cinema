import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { Customer, CustomerRepository } from './models/customer.model';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger('CustomersService');
  public constructor(
    private readonly kafkaService: KafkaService,
    @InjectModel(Customer.name)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async registerNewCustomer(
    customerToRegister: CustomerCreateDto,
    requestId: string,
  ) {
    const customer = await this.customerRepository.create(customerToRegister);
    await customer.save();
    customer.password = undefined;
    this.kafkaService.NewCustomerRegistered(customer, requestId);
  }
}
