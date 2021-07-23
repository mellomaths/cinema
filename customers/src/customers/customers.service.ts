import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaMessageDTO } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { MovieDTO } from 'src/movies/dto/movie.dto';
import { CustomerCreateDto } from './dto/customer-create.dto';
import {
  EmailNotificationDto,
  PushNotificationsDto,
} from './dto/customer-notification.dto';
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

  private async sendEmailForNewMovieRegistered(
    message: KafkaMessageDTO<MovieDTO>,
  ) {
    const customers = await this.customerRepository.find({
      'profile.notificationPreferences.email': true,
    });
    this.logger.log(`Sending email to ${customers.length} customers.`);
    customers.forEach((customer) => {
      const email: EmailNotificationDto = {
        to: customer.profile.email,
        subject: `${message.body.title} is now available in the Cinema!`,
        body: '',
        attachments: '',
      };
      this.kafkaService.SendEmail(email, message.requestId);
    });
  }

  private async sendPushNotificationForNewMovieRegistered(
    message: KafkaMessageDTO<MovieDTO>,
  ) {
    const customers = await this.customerRepository.find({
      'profile.notificationPreferences.pushNotifications': true,
    });
    this.logger.log(
      `Sending push notifications to ${customers.length} customers.`,
    );
    customers.forEach((customer) => {
      const notification: PushNotificationsDto = {
        icon: '',
        message: `${message.body.title} is now available in the Cinema!`,
        phone: customer.profile.phone,
      };
      this.kafkaService.SendPushNotification(notification, message.requestId);
    });
  }

  async notifyCustomerNewMovieRegistered(message: KafkaMessageDTO<MovieDTO>) {
    this.logger.log(
      `Notifying Customers when new movie is registered for Request ID: ${message.requestId}`,
    );
    this.sendEmailForNewMovieRegistered(message);
    this.sendPushNotificationForNewMovieRegistered(message);
  }
}
