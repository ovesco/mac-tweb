import { gql } from 'apollo-server';
import TagManager from '../../arango/manager/TagManager';

export const typeDefs = gql`
    extend type Query {
        tags(search: String): [Tag]
    }

    type Tag {
        _id: ID!
        _key: ID!
        date: String!
        tag: String!
    }
`;
export const resolvers = {
    Query: {
        tags: async (_:any, { search } : { search: string }) => TagManager.search(search),
    },
};
