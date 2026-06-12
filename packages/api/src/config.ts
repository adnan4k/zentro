import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  port: parseInt(process.env.PORT || '3001', 10),
  storageDir: path.resolve(process.env.STORAGE_DIR || './data'),
  musicDir: path.resolve(process.env.MUSIC_DIR || './assets/music'),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
