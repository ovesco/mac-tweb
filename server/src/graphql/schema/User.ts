import { gql } from 'apollo-server';
import { plainToClass } from 'class-transformer';
import UserManager from '../../arango/manager/UserManager';
import FileManager from '../../arango/manager/FileManager';
import CommentManager from '../../arango/manager/CommentManager';
import User, { IUser } from '../../arango/schema/User';
import Security from '../../auth/Security';

export const typeDefs = gql`
    extend type Query {
        user(_key: ID!): User
        users: [User]
    }

    extend type Mutation {
        addUser(data: UserInput!): Session
    }

    input UserInput {
        username: String!
        name: String!
        email: String!
        password: String!
    }

    type User {
        _key: ID!
        date: String!
        username: String!
        name: String! @capitalize
        email: String!
        files: [File] @aql(query: "FOR f IN files FILTER f.userKey == @current._key RETURN f")
        comments: [Comment] @aql(query: "FOR c IN comments FILTER c.userKey == @current._key RETURN c")
    }
`;

export const resolvers = {
    Query: {
        user: async (_:any, { _key } : { _key: string }) => UserManager.find(_key),
        users: async () => UserManager.findAll(),
    },
    User: {
        files: async (user: IUser) => FileManager.getUserFiles(user._key),
        comments: async (user: IUser) => CommentManager.getUserComments(user._key),
    },
    Mutation: {
        addUser: async (_:any, { data } : { data: IUser }) => {
            const user = await UserManager.save(plainToClass(User, data));
            return Security.createSession(user);
        },
    },
};
