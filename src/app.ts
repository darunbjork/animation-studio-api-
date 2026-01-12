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
import { httpRequestDuration, client } from "./infra/metrics/metrics"; // Import client from metrics
import { assetUploadRouter } from "./infra/http/routes/asset-upload.routes";
import { assetVersionRouter } from "./infra/http/routes/asset-version.routes";
import { assetDependencyRouter } from "./infra/http/routes/asset-dependency.routes";
import { createGraphQLServer } from "./infra/graphql/server";

export const app = express();

app.use(correlationId); // Mount correlation ID middleware first
app.use(requestLogger); // Mount request logger after correlation ID

// Metrics middleware for HTTP request duration
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    end({
      method: req.method,
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

// Routes
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/assets", assetRouter);
app.use("/assets", assetUploadRouter); // Mount asset upload router
app.use("/assets", assetVersionRouter); // Mount asset version router
app.use("/assets", assetDependencyRouter); // Mount asset dependency router

// Prometheus metrics endpoint
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

createGraphQLServer(app);

// Global error handler (must be last)
app.use(errorHandler);