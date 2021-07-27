import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaMessageDTO } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { MovieDTO } from 'src/movies/dto/movie.dto';
import {
  CustomerNotifier,
  EmailCustomerNotifier,
  PushNotificationCustomerNotifier,
} from './domain/customer-notifier';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { Customer, CustomerRepository } from './models/customer.model';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger('CustomersService');

  private notifiers: CustomerNotifier[];

  public constructor(
    private readonly kafkaService: KafkaService,
    @InjectModel(Customer.name)
    private readonly customerRepository: CustomerRepository,
  ) {
    this.notifiers = [
      new PushNotificationCustomerNotifier(
        this.kafkaService,
        this.customerRepository,
      ),
      new EmailCustomerNotifier(this.kafkaService, this.customerRepository),
    ];
  }

  async registerNewCustomer(
    customerToRegister: CustomerCreateDto,
    requestId: string,
  ) {
    this.logger.log(
      `For Request ID ${requestId} Registering customer ${customerToRegister.username}.`,
    );
    const customer = await this.customerRepository.create(customerToRegister);
    await customer.save();
    customer.password = undefined;
    this.kafkaService.NewCustomerRegistered(customer, requestId);
  }

  async notifyCustomerNewMovieRegistered(message: KafkaMessageDTO<MovieDTO>) {
    this.logger.log(
      `Notifying Customers when new movie is registered for Request ID: ${message.requestId}`,
    );
    this.notifiers.forEach((notifier) => notifier.execute(message));
  }
}
