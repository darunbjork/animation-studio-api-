import { AssetVersionService } from "../AssetVersionService";
import { AssetRepository } from "../../repositories/AssetRepository";
import { AssetVersionRepository } from "../../repositories/AssetVersionRepository";
import { LocalStorageProvider } from "../../../infra/storage/LocalStorageProvider";
import { pipelineQueue } from "../../../infra/queue/pipeline.queue"; // Import pipelineQueue
import { AssetPipelineModel } from "../../repositories/models/AssetPipeline"; // Import AssetPipelineModel

jest.mock("../../repositories/AssetRepository");
jest.mock("../../repositories/AssetVersionRepository");
jest.mock("../../../infra/storage/LocalStorageProvider");
jest.mock("../../../infra/queue/pipeline.queue"); // Mock pipelineQueue
jest.mock("../../repositories/models/AssetPipeline", () => ({
  AssetPipelineModel: {
    create: jest.fn().mockResolvedValue({}), // Mock create method
  },
}));

describe("AssetVersionService", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (AssetRepository.findOneByIdAndStudio as jest.Mock).mockReset();
    (AssetVersionRepository.getLatestVersion as jest.Mock).mockReset();
    (AssetVersionRepository.create as jest.Mock).mockReset();
    (LocalStorageProvider as jest.Mock).mockClear();
    (LocalStorageProvider.prototype.save as jest.Mock).mockReset();
    (pipelineQueue.add as jest.Mock).mockReset(); // Reset pipelineQueue mock
    (AssetPipelineModel.create as jest.Mock).mockReset(); // Reset AssetPipelineModel mock
  });

  it("creates next version number correctly", async () => {
    (AssetRepository.findOneByIdAndStudio as jest.Mock).mockResolvedValue({
      id: "asset1",
      studioId: "studio1",
      currentVersion: 1,
      save: jest.fn(),
    });

    (AssetVersionRepository.getLatestVersion as jest.Mock).mockResolvedValue({
      version: 1,
    });

    (AssetVersionRepository.create as jest.Mock).mockResolvedValue({
      assetId: "asset1",
      version: 2,
      createdBy: "user1",
      file: {
        path: "/mock/path/to/file",
        size: 1024,
        mimeType: "image/png",
      },
      changeNote: undefined,
    });

    (LocalStorageProvider.prototype.save as jest.Mock).mockResolvedValue({
      path: "/mock/path/to/file",
      size: 1024,
    });

    const version = await AssetVersionService.uploadNewVersion({
      assetId: "asset1",
      studioId: "studio1",
      userId: "user1",
      file: {
        originalname: "test.png",
        mimetype: "image/png",
        path: "/tmp/test.png",
        size: 1024,
      } as Express.Multer.File,
      userRole: "admin",
    });

    expect(version.version).toBe(2);
    expect(LocalStorageProvider.prototype.save).toHaveBeenCalledWith(
      expect.objectContaining({
        originalname: "test.png",
      }),
      "studio1/asset1/v2"
    );
    expect(AssetVersionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        assetId: "asset1",
        version: 2,
      })
    );
    expect(AssetRepository.findOneByIdAndStudio).toHaveBeenCalledWith(
      "asset1",
      "studio1"
    );
    expect(AssetPipelineModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        assetId: "asset1",
        version: 2,
      })
    );
    expect(pipelineQueue.add).toHaveBeenCalledWith(
      expect.objectContaining({
        assetId: "asset1",
        version: 2,
      })
    );
  });
});


