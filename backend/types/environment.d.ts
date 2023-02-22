export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DB_URL: string;
    }
  }
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
