import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { connectRedis, disconnectRedis } from './config/redis.js';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    await connectRedis();

    const server = app.listen(env.PORT, () => {
      console.log(`CollabFlow API running on http://localhost:${env.PORT}`);
    });

    const shutdown = async (signal: string): Promise<void> => {
      console.log(`${signal} received. Shutting down...`);

      server.close(async () => {
        try {
          await Promise.all([disconnectDatabase(), disconnectRedis()]);

          process.exit(0);
        } catch (error) {
          console.error('Shutdown failed:', error);
          process.exit(1);
        }
      });
    };

    process.once('SIGINT', () => void shutdown('SIGINT'));
    process.once('SIGTERM', () => void shutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start CollabFlow:', error);
    await Promise.allSettled([disconnectDatabase(), disconnectRedis()]);
    process.exit(1);
  }
};

void startServer();
