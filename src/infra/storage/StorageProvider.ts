export interface StorageProvider {
  save(
    file: Express.Multer.File,
    destination: string
  ): Promise<{ path: string; size: number }>;
}
