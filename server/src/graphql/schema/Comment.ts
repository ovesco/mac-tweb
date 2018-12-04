import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Comment {
        _key: ID!
        date: String!
        content: String!
        userKey: ID!
        user: User
        tags: [Tag]
    }
`;
export const resolvers = {
};
