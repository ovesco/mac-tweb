const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        users: [User]!
        user(id: ID!): User
        me: User
    }
    
    type User {
        id: ID!
        email: String!
    }
    
    type 
`;

module.exports = typeDefs;
