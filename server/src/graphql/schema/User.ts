import { gql } from 'apollo-server';
import UserManager from '../../arango/manager/UserManager';

export default {
    typeDefs: gql`
        extend type Query {
            user(key: ID!): User
        }

        type User {
            _key: ID!
            username: String!
            name: String
            email: String
        }
    `,
    resolvers: {
        Query: {
            file: async (_, { _key }) => UserManager.find(_key),
        },
    },
};
