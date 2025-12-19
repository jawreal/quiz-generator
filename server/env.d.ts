declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV?: "development" | "production";
    PASSPORT_SECRET: string;
    CEREBRAS_API_KEY: string;
    MONGODB_URI: string;
  }