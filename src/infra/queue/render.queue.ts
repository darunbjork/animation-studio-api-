import Queue from "bull";
import { env } from "../../config/env";

// Connect to the queue using the URL from environment variables
// for consistency across the application (API, workers).
export const renderQueue = new Queue("render-jobs", env.REDIS_URL);