import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env.js';
import mongoose from 'mongoose';
import { redis } from './config/redis.js';
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.get('/api/health', async (_req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;

  let redisConnected: boolean;

  try {
    redisConnected = (await redis.ping()) === 'PONG';
  } catch {
    redisConnected = false;
  }

  const isHealthy = mongoConnected && redisConnected;

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy ? 'CollabFlow API is healthy' : 'One or more services are unavailable',
    services: {
      api: 'running',
      mongodb: mongoConnected ? 'connected' : 'disconnected',
      redis: redisConnected ? 'connected' : 'disconnected',
    },
    timestamp: new Date().toISOString(),
  });
});

export default app;
