require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers, schemaDirectives } from './graphql/Schema';
import Security from './auth/Security';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: Security.context,
});

server.listen().then(() => {
    console.log(`Running`);
});
