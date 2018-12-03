import { gql } from 'apollo-server';
import ActivityManager from '../../arango/manager/ActivityManager';

export default {
    typeDefs: gql`
        extend type Query {
            activity(key: ID!): Activity
        }

        type Activity {
            _key: ID!
            content: String!
            userKey: ID!
            date: Date!
            tags: [Tag]
            files: [File]
            comments: [Comment]
        }
    `,
    resolvers: {
        Query: {
            file: async (_, { _key }) => ActivityManager.find(_key),
        },
    },
};
