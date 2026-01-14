import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { env } from './config/env';
import { connectDatabase } from './infra/database/mongoose';
import http from 'http';
import { setupSocket } from './infra/realtime/socket';
import { setupGracefulShutdown } from './shared/shutdown'; // Import graceful shutdown

const PORT = env.PORT;

async function bootstrap() {
  await connectDatabase();

  const server = http.createServer(app);
  setupSocket(server);
  setupGracefulShutdown(server); // Integrate graceful shutdown

  server.listen(PORT, () => {
    console.log(`🎬 Animation Studio API running on port ${PORT}`);
  });
}

bootstrap();
