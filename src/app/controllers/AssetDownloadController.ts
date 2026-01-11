import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { AssetVersionRepository } from "../repositories/AssetVersionRepository";

export class AssetDownloadController {
  static async download(req: Request, res: Response) {
    const { id, version } = req.params;

    const assetVersion = await AssetVersionRepository.findVersion(
      id,
      Number(version)
    );

    if (!assetVersion || !assetVersion.file || !assetVersion.file.path) {
      return res.status(404).json({ error: "Version or file not found" });
    }

    const filePath = assetVersion.file.path;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found on disk" });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": assetVersion.file.mimeType || "application/octet-stream",
      };

      res.writeHead(206, head); // 206 Partial Content
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": assetVersion.file.mimeType || "application/octet-stream",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  }
}
