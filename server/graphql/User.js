const { gql } = require('apollo-server');

module.exports.userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        name: String!
        email: String!
    }
`;

module.exports.userResolvers = {
    User: {
    },
};
