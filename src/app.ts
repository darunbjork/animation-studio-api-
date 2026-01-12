import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";

// We will create these files later
import { healthRouter } from "./infra/http/health";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { authRouter } from "./infra/http/routes/auth.routes";
import { assetRouter } from "./infra/http/routes/asset.routes";
import { correlationId } from "./shared/middlewares/correlationId"; // Restore import
import { requestLogger } from "./shared/middlewares/requestLogger"; // Restore import
import { httpRequestDuration } from "./infra/metrics/metrics";
import { metricsRouter } from "./infra/http/metrics"; // Restore import
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
