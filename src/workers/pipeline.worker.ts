import { pipelineQueue } from "../infra/queue/pipeline.queue";
import { AssetPipelineModel } from "../app/repositories/models/AssetPipeline";
import { RenderService } from "../app/services/RenderService";
import { connectDatabase } from "../infra/database/mongoose";
import { AssetModel } from "../app/repositories/models/Asset";
import { logger } from "../infra/logging/logger"; // Import logger

async function runWorker() {
  await connectDatabase();
  logger.info("Pipeline worker connected to database.");

  pipelineQueue.process(2, async (job) => {
    const { assetId, version, correlationId } = job.data;
    logger.info(`Processing pipeline for asset`, { correlationId, jobId: job.id, assetId, version });

    const asset = await AssetModel.findById(assetId);
    if (!asset) {
      logger.error(`Asset not found.`, { correlationId, assetId, jobId: job.id });
      throw new Error(`Asset ${assetId} not found.`);
    }
    const studioId = asset.studioId.toString();

    const pipeline = await AssetPipelineModel.findOne({
      assetId,
      version,
    });

    if (!pipeline) {
      logger.error(`Pipeline for asset not found.`, { correlationId, assetId, version, jobId: job.id });
      throw new Error(
        `Pipeline for asset ${assetId}, version ${version} not found.`
      );
    }

    const emitUpdate = () => {
      // Removed direct io emission
    };

    try {
      // STEP 1: VALIDATION
      pipeline.status = "VALIDATING";
      await pipeline.save();
      emitUpdate();
      logger.info(`Pipeline VALIDATING`, { correlationId, pipelineId: pipeline.id, assetId, version });
      await new Promise((r) => setTimeout(r, 500)); // Simulate work

      // STEP 2: PREVIEW GENERATION
      pipeline.status = "PROCESSING_PREVIEW";
      await pipeline.save();
      emitUpdate();
      logger.info(`Pipeline PROCESSING_PREVIEW`, { correlationId, pipelineId: pipeline.id, assetId, version });
      await new Promise((r) => setTimeout(r, 1000)); // Simulate work

      // STEP 3: READY FOR RENDER
      pipeline.status = "READY_FOR_RENDER";
      await pipeline.save();
      emitUpdate();
      logger.info(`Pipeline READY_FOR_RENDER`, { correlationId, pipelineId: pipeline.id, assetId, version });

      // STEP 4: AUTO-QUEUE RENDER
      await RenderService.enqueueRenderJob({
        studioId,
        assetId,
        version,
        correlationId, // Pass correlationId to RenderService
      });

      pipeline.status = "RENDER_QUEUED";
      await pipeline.save();
      emitUpdate();
      logger.info(`Pipeline RENDER_QUEUED`, { correlationId, pipelineId: pipeline.id, assetId, version });
    } catch (error: any) {
      logger.error(`Pipeline failed:`, { correlationId, pipelineId: pipeline.id, assetId, version, error: error.message, stack: error.stack });
      pipeline.status = "FAILED";
      pipeline.error = error.message;
      await pipeline.save();
      emitUpdate();

      throw error; // Re-throw to make Bull mark the job as failed
    }
  });

  logger.info("🚀 Pipeline worker is listening for jobs...");

  // Graceful shutdown
  const gracefulShutdown = async () => {
    logger.info("🛑 Pipeline worker graceful shutdown started");
    await pipelineQueue.close(); // Close the BullMQ queue
    logger.info("BullMQ pipeline queue closed.");
    logger.info("Finished processing active pipeline jobs. Exiting.");
    process.exit(0);
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}

runWorker().catch((err) => {
  logger.error("Pipeline worker failed to start:", { error: err.message, stack: err.stack });
  process.exit(1);
});
