import fs from 'fs';
import path from 'path';
import { StorageProvider } from './StorageProvider';

export class LocalStorageProvider implements StorageProvider {
  async save(file: Express.Multer.File, destination: string) {
    const uploadDir = path.resolve('uploads', destination);

    fs.mkdirSync(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.originalname);

    fs.renameSync(file.path, filePath);

    return {
      path: filePath,
      size: file.size,
    };
  }
}
