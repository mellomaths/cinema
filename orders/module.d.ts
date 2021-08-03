declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    KAFKA_BROKERS: string;

    KAFKA_NEW_ORDER_PURCHASED_TOPIC: string;
  }
}
