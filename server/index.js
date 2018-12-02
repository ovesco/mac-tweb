require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./graphql/schema');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});
