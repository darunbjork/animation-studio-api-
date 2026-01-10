import { app } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./infra/database/mongoose";

const PORT = env.PORT;

async function bootstrap() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🎬 Animation Studio API running on port ${PORT}`);
  });
}

bootstrap();
