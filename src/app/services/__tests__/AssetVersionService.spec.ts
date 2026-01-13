import { AssetVersionService } from "../AssetVersionService";
import { AssetRepository } from "../../repositories/AssetRepository";
import { AssetVersionRepository } from "../../repositories/AssetVersionRepository";

jest.mock("../../repositories/AssetRepository");
jest.mock("../../repositories/AssetVersionRepository");

describe("AssetVersionService", () => {
  it("creates next version number correctly", async () => {
    (AssetRepository.findOneByIdAndStudio as jest.Mock).mockResolvedValue({
      id: "asset1",
      currentVersion: 1,
      save: jest.fn(),
    });

    (AssetVersionRepository.getLatestVersion as jest.Mock).mockResolvedValue({
      version: 1,
    });

    (AssetVersionRepository.create as jest.Mock).mockResolvedValue({
      version: 2,
    });

    const version = await AssetVersionService.uploadNewVersion({
      assetId: "asset1",
      studioId: "studio1",
      userId: "user1",
      file: {} as any,
    });

    expect(version.version).toBe(2);
  });
});
