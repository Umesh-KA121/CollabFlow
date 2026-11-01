import { Redis } from 'ioredis';

import { env } from './env.js';

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true,
});

redis.on('connect', () => {
  console.log('Redis connecting...');
});

redis.on('ready', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error.message);
});

redis.on('close', () => {
  console.log('Redis connection closed');
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redis.connect();
    await redis.ping();
  } catch (error) {
    console.error('Redis connection failed:', error);
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  await redis.quit();
  console.log('Redis disconnected');
};
