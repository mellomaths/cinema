declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    KAFKA_BROKERS: string;
    MONGO_URI: string;

    KAFKA_NEW_ORDER_PURCHASED_TOPIC: string;
  }
}
