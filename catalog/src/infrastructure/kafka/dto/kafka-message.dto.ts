export class KafkaMessageDTO<T> {
  requestId: string;
  body: T;

  stringify(): string {
    return JSON.stringify(this);
  }
}

export class KafkaIncomingMessage<T> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: KafkaMessageDTO<T>;
  headers: Record<string, any>;
}
