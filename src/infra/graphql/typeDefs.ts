import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Asset {
    id: ID!
    name: String!
    type: String!
    currentVersion: Int!
    versions: [AssetVersion!]!
    pipeline: AssetPipeline
    dependencies: [AssetDependency!]!
  }

  type AssetVersion {
    version: Int!
    createdAt: String!
    changeNote: String
  }

  type AssetPipeline {
    status: String!
    updatedAt: String!
    error: String
  }

  type AssetDependency {
    parentAssetId: ID!
    childAssetId: ID!
    type: String!
  }

  type Query {
    asset(id: ID!): Asset
    assets: [Asset!]!
  }
`;
