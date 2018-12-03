require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import colibriGQL from './graphql/Schema';

const server = new ApolloServer({
    typeDefs: colibriGQL.typedefs,
    resolvers: colibriGQL.resolvers,
});
server.listen().then(() => {
    console.log(`Running`);
});
