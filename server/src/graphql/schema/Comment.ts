import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Comment {
        _id: ID!
        _key: ID!
        date: String!
        content: String!
        userKey: ID!
        user: User @aql(query: "FOR c IN comments FILTER @current.userKey == c._key RETURN c", single: true)
    }
`;

export const resolvers = {
};
