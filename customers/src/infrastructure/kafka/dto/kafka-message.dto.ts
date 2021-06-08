export class KafkaMessageDTO<T> {
  requestId: string;
  body: T;

  stringify(): string {
    return JSON.stringify(this);
  }
}
