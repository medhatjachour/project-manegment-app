import { getEnv } from '../utils/get-env';

const appConfig = () => ({
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: getEnv('PORT', '9000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  MONGO_URL: getEnv('MONGO_URL', 'mongodb://localhost:27017/project-management-app'),
  
  SESSION_SECRET: getEnv('SESSION_SECRET'),
  SESSION_EXPIRES_IN: getEnv('SESSION_EXPIRES_IN'),

  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
  GOOGLE_CALLBACK_URL: getEnv('GOOGLE_CALLBACK_URL'),

  FRONTEND_ORIGIN: getEnv('FRONTEND_ORIGIN', 'http://localhost:5173'),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv('FRONTEND_GOOGLE_CALLBACK_URL'),
});
export const config = appConfig();
