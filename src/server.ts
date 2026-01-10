import { app } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./infra/database/mongoose";
import http from "http";
import { setupSocket } from "./infra/realtime/socket";

const PORT = env.PORT;

async function bootstrap() {
  await connectDatabase();

  const server = http.createServer(app);
  setupSocket(server);

  server.listen(PORT, () => {
    console.log(`🎬 Animation Studio API running on port ${PORT}`);
  });
}

bootstrap();
