import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "animation-studio-api",
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get("/ready", (_req, res) => {
  res.status(200).json({ ready: true });
});
