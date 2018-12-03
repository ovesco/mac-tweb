require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import colibriGQL from './graphql/Schema';

const server = new ApolloServer({
    typeDefs: colibriGQL.resolvers,
    resolvers: colibriGQL.resolvers,
});
server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});
