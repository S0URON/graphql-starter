import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

import config from './config/config';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      const authorization = req.headers.authorization;
      return { authorization };
    }
  }
});

const app = express();
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: config.PORT }, () => {
  console.log(`🚀 Server ready at ${config.HOST}${apolloServer.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ${config.WS}${apolloServer.subscriptionsPath}`);
});
