import { renderQueue } from "../../infra/queue/render.queue";
import { RenderJobModel } from "../repositories/models/RenderJob";

export class RenderService {
  static async enqueueRenderJob(params: {
    studioId: string;
    assetId: string;
    version: number;
  }) {
    const job = await RenderJobModel.create({
      studioId: params.studioId,
      assetId: params.assetId,
      version: params.version,
    });

    await renderQueue.add(
      {
        renderJobId: job.id,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      }
    );

    return job;
  }
}
