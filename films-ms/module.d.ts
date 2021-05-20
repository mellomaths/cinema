declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    KAFKA_BROKERS: string;
  }
}
