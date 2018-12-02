const { gql } = require('apollo-server');
const UserManager = require('./../database/manager/UserManager');

module.exports.userTypeDefs = gql`
    extend type Query {
        user(key: ID!): User
    }
    
    type User {
        id: ID!
        username: String!
        name: String!
        email: String!
    }
`;

module.exports.userResolvers = {
    Query: {
        user: async (_, { key }) => UserManager.find(key),
    },
};
