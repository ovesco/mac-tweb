import { gql } from 'apollo-server';
import TagManager from '../../arango/manager/TagManager';

export const typeDefs = gql`
    extend type Query {
        tag(_key: ID!): Tag
    }

    type Tag {
        _key: ID!
        date: String!
        tag: String!
    }
`;
export const resolvers = {
    Query: {
        tag: async (_:any, { _key } : { _key: string }) => TagManager.find(_key),
    },
};

