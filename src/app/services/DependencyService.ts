import { AssetDependencyRepository } from "../repositories/AssetDependencyRepository";

export class DependencyService {
  static async createsCycle(
    parentAssetId: string,
    childAssetId: string,
    version: number,
    visited = new Set<string>()
  ): Promise<boolean> {
    if (parentAssetId === childAssetId) {
      return true;
    }

    if (visited.has(childAssetId)) {
      return false;
    }

    visited.add(childAssetId);

    const parents = await AssetDependencyRepository.findParents(
      childAssetId,
      version
    );

    for (const dep of parents) {
      if (
        await this.createsCycle(
          parentAssetId,
          dep.parentAssetId.toString(),
          dep.parentVersion,
          visited
        )
      ) {
        return true;
      }
    }

    return false;
  }
}
