import { gql } from 'apollo-server';
import FileManager from '../../arango/manager/FileManager';

export default {
    typeDefs: gql`
        extend type Query {
            file(key: ID!): File
        }

        type File {
            _key: ID!
            filename: String!
            mimeType: String!
            size: Number!
            userKey: ID!
            date: Date!
            src: String
            tags: [Tag]
            comments: [Comment]
        }
    `,
    resolvers: {
        Query: {
            file: async (_, { _key }) => FileManager.find(_key),
        },
    },
};
