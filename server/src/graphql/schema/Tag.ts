import { gql } from 'apollo-server';
import TagManager from '../../arango/manager/TagManager';

export default {
    typeDefs: gql`
        extend type Query {
            tag(key: ID!): Tag
        }

        type Tag {
            _key: ID!
            tag: String!
        }
    `,
    resolvers: {
        Query: {
            file: async (_, { _key }) => TagManager.find(_key),
        },
    },
};
