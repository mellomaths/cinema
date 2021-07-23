export class EmailNotificationDto {
  to: string;
  subject: string;
  body: string;
  attachments: string;
}

export class PushNotificationsDto {
  message: string;
  icon: string;
  phone: string;
}
