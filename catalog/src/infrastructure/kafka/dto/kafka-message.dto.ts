export class KafkaMessageDTO<T> {
  requestId: string;
  body: T;
}
