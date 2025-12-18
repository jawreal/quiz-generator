declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV?: "development" | "production";
    readonly CEREBRAS_API_KEY: string;
    readonly MONGODB_URI: string;
  }