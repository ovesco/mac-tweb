const { gql } = require('apollo-server');
const { merge } = require('lodash');
const { mergeTypes } = require('merge-graphql-schemas');
const { userTypeDefs, userResolvers } = require('./User');
const { fileTypeDefs, fileResolvers } = require('./File');

const query = gql`
    type Query {
        _empty: String
    }
`;

module.exports.typeDefs = mergeTypes([
    query,
    userTypeDefs,
    fileTypeDefs,
]);
module.exports.resolvers = merge(
    userResolvers,
    fileResolvers,
);
