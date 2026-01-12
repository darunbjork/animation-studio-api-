import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

export function createGraphQLServer(app: any) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user,
    }),
  });

  server.start().then(() => {
    server.applyMiddleware({ app, path: "/graphql" });
  });
}
