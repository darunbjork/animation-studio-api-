import { renderQueue } from "../infra/queue/render.queue";
import { RenderJobModel } from "../app/repositories/models/RenderJob";
import { connectDatabase } from "../infra/database/mongoose";

async function runWorker() {
  await connectDatabase();
  console.log("Render worker connected to database.");

  // Start the worker to process jobs
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

    // Simulate render steps
    for (let i = 1; i <= 10; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const progress = i * 10;
      job.progress(progress);
      renderJob.progress = progress;
      await renderJob.save();

      // Emit progress (removed direct io emission)
    }

    renderJob.status = "COMPLETED";
    renderJob.progress = 100;
    await renderJob.save();
    console.log(`Render job ${job.id} completed.`);

    // Emit completion (removed direct io emission)
  });

  renderQueue.on("failed", async (job, err) => {
    console.error(`Render job ${job.id} failed:`, err.message);
    const { renderJobId } = job.data;
    const renderJob = await RenderJobModel.findById(renderJobId);
    if (!renderJob) return;

    renderJob.status = "FAILED";
    renderJob.error = err.message;
    await renderJob.save();

    // Emit failure (removed direct io emission)
  });

  console.log("🚀 Render worker is listening for jobs...");

  // Graceful shutdown
  const gracefulShutdown = async () => {
    console.log("🛑 Render worker graceful shutdown started");
    await renderQueue.close(); // Close the BullMQ queue
    console.log("BullMQ render queue closed.");
    // Mongoose connection is automatically managed by its internal connection pool.
    // Explicit close is usually not needed unless process.exit() is called immediately.
    // For workers, allowing existing tasks to complete is key.
    console.log("Finished processing active render jobs. Exiting.");
    process.exit(0);
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}

runWorker().catch((err) => {
  console.error("Worker failed to start:", err);
  process.exit(1);
});
