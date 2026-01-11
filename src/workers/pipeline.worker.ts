import { pipelineQueue } from "../infra/queue/pipeline.queue";
import { AssetPipelineModel } from "../app/repositories/models/AssetPipeline";
import { RenderService } from "../app/services/RenderService";
import { connectDatabase } from "../infra/database/mongoose";
import { AssetModel } from "../app/repositories/models/Asset";
import { io } from "../infra/realtime/socket";

async function runWorker() {
  await connectDatabase();
  console.log("Pipeline worker connected to database.");

  pipelineQueue.process(2, async (job) => {
    const { assetId, version } = job.data;
    console.log(`Processing pipeline for asset ${assetId}, version ${version}`);

    const asset = await AssetModel.findById(assetId);
    if (!asset) {
      console.error(`Asset ${assetId} not found.`);
      throw new Error(`Asset ${assetId} not found.`);
    }
    const studioId = asset.studioId.toString();

    const pipeline = await AssetPipelineModel.findOne({
      assetId,
      version,
    });

    if (!pipeline) {
      console.error(
        `Pipeline for asset ${assetId}, version ${version} not found.`
      );
      throw new Error(
        `Pipeline for asset ${assetId}, version ${version} not found.`
      );
    }

    const emitUpdate = () => {
      if (io) {
        io.to(`studio:${studioId}`).emit("pipeline:update", {
          assetId,
          version,
          status: pipeline.status,
          error: pipeline.error,
        });
      }
    };

    try {
      // STEP 1: VALIDATION
      pipeline.status = "VALIDATING";
      await pipeline.save();
      emitUpdate();
      console.log(`Pipeline ${pipeline.id}: VALIDATING`);
      // (Future: file integrity, format checks)
      await new Promise((r) => setTimeout(r, 500)); // Simulate work

      // STEP 2: PREVIEW GENERATION
      pipeline.status = "PROCESSING_PREVIEW";
      await pipeline.save();
      emitUpdate();
      console.log(`Pipeline ${pipeline.id}: PROCESSING_PREVIEW`);
      // (Future: FFmpeg / Sharp)
      await new Promise((r) => setTimeout(r, 1000)); // Simulate work

      // STEP 3: READY FOR RENDER
      pipeline.status = "READY_FOR_RENDER";
      await pipeline.save();
      emitUpdate();
      console.log(`Pipeline ${pipeline.id}: READY_FOR_RENDER`);

      // STEP 4: AUTO-QUEUE RENDER
      await RenderService.enqueueRenderJob({
        studioId,
        assetId,
        version,
      });

      pipeline.status = "RENDER_QUEUED";
      await pipeline.save();
      emitUpdate();
      console.log(`Pipeline ${pipeline.id}: RENDER_QUEUED`);
    } catch (error: any) {
      console.error(`Pipeline ${pipeline.id} failed:`, error.message);
      pipeline.status = "FAILED";
      pipeline.error = error.message;
      await pipeline.save();
      emitUpdate();

      throw error; // Re-throw to make Bull mark the job as failed
    }
  });

  console.log("🚀 Pipeline worker is listening for jobs...");
}

runWorker().catch((err) => {
  console.error("Pipeline worker failed to start:", err);
  process.exit(1);
});
