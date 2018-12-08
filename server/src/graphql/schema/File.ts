import { gql } from 'apollo-server';
import FileManager from '../../arango/manager/FileManager';
import Uploader from '../../fs/Uploader';
import File, { IFile, IFileInput } from '../../arango/schema/File';
import { getUser } from './Helper';
import { ISecurityContext } from '../../auth/Security';
import TagManager from "../../arango/manager/TagManager";

export const typeDefs = gql`
    extend type Query {
        file(_key: ID!): File
    }

    extend type Mutation {
        uploadFiles(files: [FileInput]!): [File]
    }

    input FileInput {
        description: String
        upload: Upload!
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
    Mutation: {
        // @ts-ignore
        uploadFiles: async (parent: any, { files } : { files: Array<object> },
                            context: ISecurityContext) => {
            files.forEach(async (fileInput: IFileInput) => {
                const { stream, filename, mimetype } = await fileInput.upload;
                if(!Uploader.mimeTypeSupported(mimetype)) throw new Error('Unsupported mime type');
                const file = new File();
                file.filename = filename;
                file.description = fileInput.description;
                file.src = Uploader.buildPath(context.user._key);
                file.mimeType = mimetype;
                file.userKey = context.user._key;
                Uploader.writeStream(stream, file.src, () => {
                    
                });
            });
            return [];
        },
    },
};
