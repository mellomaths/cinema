declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    KAFKA_BROKERS: string;

    KAFKA_SEND_PUSH_NOTIFICATION_TOPIC: string;
  }
}
