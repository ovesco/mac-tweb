import { gql } from 'apollo-server';
import FileManager from '../../arango/manager/FileManager';
import { IFile } from '../../arango/schema/File';
import { getUser } from './Helper';

export const typeDefs = gql`
    extend type Query {
        file(_key: ID!): File
    }

    type File {
        _key: ID!
        date: String!
        description: String!
        filename: String!
        mimeType: String!
        size: Int!
        userKey: ID!
        user: User
        src: String
        tags: [Tag]
        comments: [Comment]
    }
`;
export const resolvers = {
    Query: {
        file: async (_:any, { _key } : { _key: string }) => FileManager.find(_key),
    },
    File: {
        user: async (file: IFile) => getUser(file.userKey),
    },
};
