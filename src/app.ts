import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";

// We will create these files later
import { healthRouter } from "./infra/http/health";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { authRouter } from "./infra/http/routes/auth.routes";
import { assetRouter } from "./infra/http/routes/asset.routes";
import { correlationId } from "./shared/middlewares/correlationId";
import { requestLogger } from "./shared/middlewares/requestLogger";
import { httpRequestCounter } from "./infra/metrics/metrics";
import { metricsRouter } from "./infra/http/metrics";
import { assetUploadRouter } from "./infra/http/routes/asset-upload.routes";

export const app = express();

app.use(correlationId); // Mount correlation ID middleware first
app.use(requestLogger); // Mount request logger after correlation ID

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      // @ts-ignore
      route: req.baseUrl + req.path, // Use req.baseUrl + req.path for full route
      status: res.statusCode,
    });
  });
  next();
});

// Security headers
app.use(helmet());

// Rate limiting (protect asset APIs)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

// JSON parsing
app.use(json({ limit: "10mb" }));

// Routes (will be uncommented once healthRouter is created)
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/assets", assetRouter);
app.use("/assets", assetUploadRouter); // Mount asset upload router
app.use("/metrics", metricsRouter);

// Global error handler (must be last) (will be uncommented once errorHandler is created)
app.use(errorHandler);
