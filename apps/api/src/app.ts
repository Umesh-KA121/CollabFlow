import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'CollabFlow API is running',
    timestamp: new Date().toISOString(),
  });
});

export default app;
