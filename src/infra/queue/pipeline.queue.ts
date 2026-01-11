import Queue from "bull";
import { env } from "../../config/env";

export const pipelineQueue = new Queue("asset-pipeline", env.REDIS_URL);
