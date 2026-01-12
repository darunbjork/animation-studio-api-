import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { redis } from "../queue/redis"; // Assuming redis is exported from infra/queue/redis.ts

export const healthRouter = Router();

healthRouter.get("/", async (_req: Request, res: Response) => {
  const mongo = mongoose.connection.readyState === 1; // 1 means connected
  const redisOk = redis.status === "ready"; // Or check for specific Redis command success

  const healthy = mongo && redisOk;

  res.status(healthy ? 200 : 503).json({
    status: healthy ? "healthy" : "unhealthy",
    mongo: mongo ? "ok" : "disconnected",
    redis: redisOk ? "ok" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get("/ready", (_req, res) => {
  res.status(200).json({ ready: true });
});
