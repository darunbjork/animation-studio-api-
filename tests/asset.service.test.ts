import { AssetService } from "../src/app/services/AssetService";
import { AppError } from "../src/shared/errors/AppError";

describe("AssetService", () => {
  it("should reject asset without name", async () => {
    await expect(
      AssetService.createAsset({
        studioId: "studio",
        userId: "user",
        name: "",
        type: "CHARACTER",
      })
    ).rejects.toThrow(new AppError("Asset name is required", 400));
  });
});
