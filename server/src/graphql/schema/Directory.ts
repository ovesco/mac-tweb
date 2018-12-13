import { gql } from 'apollo-server';
import { ISecurityContext } from '../../auth/SecurityController';
import DirectoryManager from '../../arango/manager/DirectoryManager';
import Directory, { IDirectory } from '../../arango/schema/Directory';
import DirectoryFileEdgeManager from '../../arango/manager/DirectoryFileEdgeManager';
import DirectoryFileEdge from '../../arango/schema/DirectoryFileEdge';
import FileManager from '../../arango/manager/FileManager';

export const typeDefs = gql`
    extend type Query {
        directory(_key: ID!): Directory
        directories: [Directory]
    }

    extend type Mutation {
        addDirectory(name: String!): Directory
        addFileToDirectory(directoryId: ID!, fileId: ID!): File
        removeFileFromDirectory(directoryId: ID!, fileId: ID!): Boolean
    }

    type Directory {
        _id: ID!
        _key: ID!
        date: String!
        name: String!
        userKey: String!
        user: User! @aql(query: "FOR u IN users FILTER u._key == @current.userKey RETURN u", single: true)
        files: [File]
    }
`;

export const resolvers = {
    Query: {
        directory: async (_:any, { _key } : { _key: string }) => DirectoryManager.find(_key),
        directories: async (x:any, y:any, context:ISecurityContext) => {
            return DirectoryManager.findBy({ userKey: context.user._key });
        },
    },
    Directory: {
        files: async (parent: IDirectory) => DirectoryFileEdgeManager.getDirectoryFiles(parent._id).catch(e => {
            console.log(e);
        }),
    },
    Mutation: {
        addDirectory: async (_:any, { name } :  { name: string }, context: ISecurityContext) => {
            return DirectoryManager.save(new Directory(name, context.user._key));
        },
        addFileToDirectory: async (_:any, { fileId, directoryId } : { fileId: string, directoryId: string }) => {
            return FileManager.findById(fileId).then((file) => {
                if(!file) throw new Error('File not found');
                return DirectoryManager.findById(directoryId).then((directory) => {
                    if(!directory) throw new Error('Directory not found');
                    const dirFile = new DirectoryFileEdge(directoryId, fileId);
                    return DirectoryFileEdgeManager.saveIfNoExist(dirFile).then(() => file);
                });
            });
        },
        removeFileFromDirectory: async (_:any, { fileId, directoryId } : { fileId: string, directoryId: string }) => {
            return DirectoryFileEdgeManager.findOneBy({ _from: directoryId, _to: fileId }, true).then((df) => {
                if(!df) return false;
                return DirectoryFileEdgeManager.remove(df).then(() => true);
            });
        },
    },
};
