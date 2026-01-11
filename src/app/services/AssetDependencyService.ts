import { DependencyService } from "./DependencyService";
import { AssetDependencyRepository } from "../repositories/AssetDependencyRepository";
import { ValidationError } from "../../shared/errors/ValidationError";

export class AssetDependencyService {
  static async linkAssets(params: {
    parentAssetId: string;
    parentVersion: number;
    childAssetId: string;
    childVersion: number;
  }) {
    const createsCycle = await DependencyService.createsCycle(
      params.parentAssetId,
      params.childAssetId,
      params.childVersion
    );

    if (createsCycle) {
      throw new ValidationError("Circular dependency detected");
    }

    return AssetDependencyRepository.create(params);
  }
}
