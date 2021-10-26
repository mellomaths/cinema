declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    KAFKA_BROKERS: string;

    KAFKA_NEW_ORDER_PURCHASED_TOPIC: string;
  }
}
