declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    KAFKA_BROKERS: string;

    KAFKA_SEND_EMAIL_TOPIC: string;
  }
}
