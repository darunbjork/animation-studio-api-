import { AssetService } from "../src/app/services/AssetService";
import { ValidationError } from "../src/shared/errors/ValidationError";

describe("AssetService", () => {
  it("should reject asset without name", async () => {
    await expect(
      AssetService.createAsset({
        studioId: "studio",
        userId: "user",
        name: "",
        type: "CHARACTER",
      })
    ).rejects.toThrow(new ValidationError("Asset name is required"));
  });
});
