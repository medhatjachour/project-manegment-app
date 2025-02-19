import { getEnv } from '../utils/get-env';

const appConfig = () => ({
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: getEnv('PORT', '3000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  MONGO_URL: getEnv('MONGO_URL', 'mongodb://localhost:27017/express-mongo'),
  
  SESSION_SECRET: getEnv('SESSION_SECRET', 'default_secret'),
  SESSION_EXPIRES_IN: getEnv('SESSION_EXPIRES_IN', '604800000'),

  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID', 'your_google_client_id'),
  GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET', 'your_google_client_id'),
  GOOGLE_CALLBACK_URL: getEnv('GOOGLE_CALLBACK_URL', 'your_google_client_id'),

  FRONTEND_ORIGIN: getEnv('FRONTEND_ORIGIN', 'http://localhost:5173'),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv('FRONTEND_GOOGLE_CALLBACK_URL', 'your_google_client_id'),
});
export const config = appConfig();
