import { AssetDependencyRepository } from '../repositories/AssetDependencyRepository';

export class ImpactAnalysisService {
  static async findImpactedAssets(
    assetId: string,
    version: number,
    impacted = new Set<string>()
  ): Promise<Set<string>> {
    const children = await AssetDependencyRepository.findChildren(
      assetId,
      version
    );

    for (const dep of children) {
      const key = `${dep.childAssetId}:${dep.childVersion}`;

      if (!impacted.has(key)) {
        impacted.add(key);
        await this.findImpactedAssets(
          dep.childAssetId.toString(),
          dep.childVersion,
          impacted
        );
      }
    }

    return impacted;
  }
}
