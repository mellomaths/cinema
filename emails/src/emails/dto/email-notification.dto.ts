export class EmailNotificationDto {
  to: string;
  subject: string;
  body: string;
  attachments?: string[] = [];
}
