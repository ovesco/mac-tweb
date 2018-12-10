import { gql } from 'apollo-server';
import { ISecurityContext } from '../../auth/SecurityController';
import DirectoryManager from '../../arango/manager/DirectoryManager';
import Directory, { IDirectory } from '../../arango/schema/Directory';

export const typeDefs = gql`
    extend type Query {
        directory(_key: ID!): Directory
        directories: [Directory]
    }

    extend type Mutation {
        addDirectory(name: String!): Directory
    }

    type Directory {
        _key: ID!
        date: String!
        name: String!
        userKey: String!
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
        files: (parent: object, args: object, context: object) : Array<IDirectory> => {
            console.log(context);
            return [];
        },
    },
    Mutation: {
        addDirectory: async (_:any, { name } :  { name: string }, context: ISecurityContext) => {
            return DirectoryManager.save(new Directory(name, context.user._key));
        },
    },
};
