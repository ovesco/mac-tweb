import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Session {
        userKey: String!
        localKey: String!
    }
`;
export const resolvers = {};
