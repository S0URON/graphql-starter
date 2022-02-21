import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import * as authGuard from "./services/authGuard"
import config from './config/config';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("connected to db!")
}).catch((err) => {
  console.log("db connection error :", err);
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      if(req.headers.authorization){
        const authorization = req.headers.authorization;
        const authorizedUser = await authGuard.verifyAccessToken(authorization);
        return {authorizedUser}
      }
      return null
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
