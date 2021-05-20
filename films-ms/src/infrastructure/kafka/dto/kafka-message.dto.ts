export class KafkaMessageDTO<T> {
  eventType: string;
  requestId: string;
  body: T;
}
