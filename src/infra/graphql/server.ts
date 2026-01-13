import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export function createGraphQLServer(app: any) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.start().then(() => {
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => ({ user: req.user }),
      })
    );
  });
}
