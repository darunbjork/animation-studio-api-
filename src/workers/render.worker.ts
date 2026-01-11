import { renderQueue } from "../infra/queue/render.queue";
import { RenderJobModel } from "../app/repositories/models/RenderJob";
import { io } from "../infra/realtime/socket";
import { connectDatabase } from "../infra/database/mongoose";

async function runWorker() {
  await connectDatabase();
  console.log("Render worker connected to database.");

  renderQueue.process(2, async (job) => {
    console.log(`Processing render job ${job.id}`);
    const { renderJobId } = job.data;

    const renderJob = await RenderJobModel.findById(renderJobId);
    if (!renderJob) {
      console.error(`Render job ${renderJobId} not found in database.`);
      return;
    }

    renderJob.status = "PROCESSING";
    await renderJob.save();

    if (io) {
      io.to(`studio:${renderJob.studioId}`).emit("render:progress", {
        renderJobId,
        status: renderJob.status,
        progress: renderJob.progress,
      });
    }

    // Simulate render steps
    for (let i = 1; i <= 10; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const progress = i * 10;
      job.progress(progress);
      renderJob.progress = progress;
      await renderJob.save();

      // Emit progress
      if (io) {
        io.to(`studio:${renderJob.studioId}`).emit("render:progress", {
          renderJobId,
          status: renderJob.status,
          progress: renderJob.progress,
        });
      }
    }

    renderJob.status = "COMPLETED";
    renderJob.progress = 100;
    await renderJob.save();
    console.log(`Render job ${job.id} completed.`);

    if (io) {
      io.to(`studio:${renderJob.studioId}`).emit("render:progress", {
        renderJobId,
        status: renderJob.status,
        progress: renderJob.progress,
      });
    }
  });

  renderQueue.on("failed", async (job, err) => {
    console.error(`Render job ${job.id} failed:`, err.message);
    const { renderJobId } = job.data;
    const renderJob = await RenderJobModel.findById(renderJobId);
    if (!renderJob) return;

    renderJob.status = "FAILED";
    renderJob.error = err.message;
    await renderJob.save();

    if (io) {
      io.to(`studio:${renderJob.studioId}`).emit("render:progress", {
        renderJobId,
        status: renderJob.status,
        error: renderJob.error,
      });
    }
  });

  console.log("🚀 Render worker is listening for jobs...");
}

runWorker().catch((err) => {
  console.error("Worker failed to start:", err);
  process.exit(1);
});
