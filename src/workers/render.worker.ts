import { renderQueue } from '../infra/queue/render.queue';
import { RenderJobModel } from '../app/repositories/models/RenderJob';
import { connectDatabase } from '../infra/database/mongoose';
import { logger } from '../infra/logging/logger'; // Import logger

async function runWorker() {
  await connectDatabase();
  logger.info('Render worker connected to database.');

  // Start the worker to process jobs
  renderQueue.process(2, async (job) => {
    const { renderJobId, correlationId } = job.data;
    logger.info(`Processing render job`, {
      correlationId,
      jobId: job.id,
      renderJobId,
    });

    const renderJob = await RenderJobModel.findById(renderJobId);
    if (!renderJob) {
      logger.error(`Render job not found in database.`, {
        correlationId,
        renderJobId,
        jobId: job.id,
      });
      return;
    }

    renderJob.status = 'PROCESSING';
    await renderJob.save();
    logger.info('Render job status updated to PROCESSING', {
      correlationId,
      renderJobId,
    });

    // Simulate render steps
    for (let i = 1; i <= 10; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const progress = i * 10;
      job.progress(progress);
      renderJob.progress = progress;
      await renderJob.save();
      logger.info(`Render job progress update`, {
        correlationId,
        renderJobId,
        progress,
      });
    }

    renderJob.status = 'COMPLETED';
    renderJob.progress = 100;
    await renderJob.save();
    logger.info(`Render job completed.`, {
      correlationId,
      renderJobId,
      jobId: job.id,
    });
  });

  renderQueue.on('failed', async (job, err) => {
    const { renderJobId, correlationId } = job.data;
    logger.error(`Render job failed:`, {
      correlationId,
      jobId: job.id,
      renderJobId,
      error: err.message,
    });

    const renderJob = await RenderJobModel.findById(renderJobId);
    if (!renderJob) {
      logger.error(`Render job not found on failed event.`, {
        correlationId,
        renderJobId,
        jobId: job.id,
      });
      return;
    }

    renderJob.status = 'FAILED';
    renderJob.error = err.message;
    await renderJob.save();
    logger.info('Render job status updated to FAILED', {
      correlationId,
      renderJobId,
    });
  });

  logger.info('🚀 Render worker is listening for jobs...');

  // Graceful shutdown
  const gracefulShutdown = async () => {
    logger.info('🛑 Render worker graceful shutdown started');
    await renderQueue.close(); // Close the BullMQ queue
    logger.info('BullMQ render queue closed.');
    logger.info('Finished processing active render jobs. Exiting.');
    process.exit(0);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

runWorker().catch((err) => {
  logger.error('Render worker failed to start:', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});
