import { Request, Response } from "express";
import { RenderService } from "../services/RenderService";

export class RenderController {
  static async start(req: Request, res: Response) {
    const job = await RenderService.enqueueRenderJob({
      // @ts-ignore
      studioId: req.user.studioId,
      assetId: req.params.id,
      version: req.body.version,
    });

    res.status(202).json(job);
  }
}
