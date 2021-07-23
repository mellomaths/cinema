declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    KAFKA_BROKERS: string;

    KAFKA_NEW_CUSTOMER_REGISTERED_TOPIC: string;
    KAFKA_SEND_EMAIL_TOPIC: string;
    KAFKA_SEND_PUSH_NOTIFICATION_TOPIC: string;
  }
}
