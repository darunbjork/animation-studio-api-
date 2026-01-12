import { renderQueue } from "../../infra/queue/render.queue";
import { RenderJobModel } from "../repositories/models/RenderJob";
import { logger } from "../../infra/logging/logger"; // Import logger

export class RenderService {
  static async enqueueRenderJob(params: {
    studioId: string;
    assetId: string;
    version: number;
    correlationId?: string; // Accept correlationId
  }) {
    const job = await RenderJobModel.create({
      studioId: params.studioId,
      assetId: params.assetId,
      version: params.version,
    });
    logger.info("Render job created in DB", { correlationId: params.correlationId, renderJobId: job.id, studioId: params.studioId });

    await renderQueue.add(
      {
        renderJobId: job.id,
        correlationId: params.correlationId, // Pass correlationId to the job data
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      }
    );
    logger.info("Render job enqueued", { correlationId: params.correlationId, renderJobId: job.id, studioId: params.studioId });

    return job;
  }
}
