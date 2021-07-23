import { Logger } from '@nestjs/common';
import { KafkaMessageDTO } from 'src/infrastructure/kafka/dto/kafka-message.dto';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';
import { MovieDTO } from 'src/movies/dto/movie.dto';
import {
  PushNotificationsDto,
  EmailNotificationDto,
} from '../dto/customer-notification.dto';
import { CustomerRepository } from '../models/customer.model';

export abstract class CustomerNotifier {
  protected kafkaService: KafkaService;
  protected customerRepository: CustomerRepository;

  protected readonly logger = new Logger('CustomerNotifier');

  constructor(
    kafkaService: KafkaService,
    customerRepository: CustomerRepository,
  ) {
    this.customerRepository = customerRepository;
    this.kafkaService = kafkaService;
  }

  abstract execute(message: KafkaMessageDTO<MovieDTO>): Promise<void>;
}

export class PushNotificationCustomerNotifier extends CustomerNotifier {
  async execute(message: KafkaMessageDTO<MovieDTO>) {
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
}

export class EmailCustomerNotifier extends CustomerNotifier {
  async execute(message: KafkaMessageDTO<MovieDTO>) {
    const customers = await this.customerRepository.find({
      'profile.notificationPreferences.email': true,
    });
    this.logger.log(`Sending email to ${customers.length} customers.`);
    customers.forEach((customer) => {
      const email: EmailNotificationDto = {
        to: customer.profile.email,
        subject: `${message.body.title} is now available in the Cinema!`,
        body: '',
      };
      this.kafkaService.SendEmail(email, message.requestId);
    });
  }
}
