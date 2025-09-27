declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_URL: string;
    IDENTITY_WEBHOOK_PATH: string;
    CELO_NETWORK?: string;
  }
}
