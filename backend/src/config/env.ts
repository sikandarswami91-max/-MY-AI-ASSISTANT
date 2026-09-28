import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env files in priority order:
// 1. `process.cwd()/.env` (e.g. backend/.env when the server runs from backend/)
// 2. monorepo root `.env` (GEMINI_API_KEY, MONGODB_URI, etc.)
// dotenv never overwrites variables that are already set, so the first file wins.
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/nova_ai_assistant',
  JWT_SECRET: process.env.JWT_SECRET || 'nova_ai_assistant_super_jwt_secret_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  MAX_FILE_SIZE_MB: parseInt(process.env.MAX_FILE_SIZE_MB || '50', 10),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || '',
  SERP_API_KEY: process.env.SERP_API_KEY || '',
};
