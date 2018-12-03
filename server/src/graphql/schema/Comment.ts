import { gql } from 'apollo-server';
import CommentManager from '../../arango/manager/CommentManager';

export default {
    typeDefs: gql`
        extend type Query {
            comment(key: ID!): Comment
        }

        type Comment {
            _key: ID!
            content: String!
            userKey: ID!
            date: Date!
            tags: [Tag]
        }
    `,
    resolvers: {
        Query: {
            file: async (_, { _key }) => CommentManager.find(_key),
        },
    },
};
