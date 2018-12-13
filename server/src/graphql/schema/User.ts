import { gql } from 'apollo-server';
import { plainToClass } from 'class-transformer';
import UserManager from '../../arango/manager/UserManager';
import User, { IUser } from '../../arango/schema/User';
import SecurityController, { ISecurityContext } from '../../auth/SecurityController';
import LikeManager from '../../arango/manager/LikeManager';

export const typeDefs = gql`
    extend type Query {
        me: User
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
        likes: [Like] @aql(query: "For l IN likes FILTER l._from == @current._id RETURN l")
        reputation: [Like]
    }
`;

export const resolvers = {
    Query: {
        me: async (x: any, y: any, context: ISecurityContext) => UserManager.find(context.user._key),
        user: async (_:any, { _key } : { _key: string }) => UserManager.find(_key),
        users: async () => UserManager.findAll(),
    },
    User: {
        reputation: async(user: IUser) => {
            return LikeManager.getUserReputation(user).catch((error) => {
                console.log(error);
                return [];
            });
        },
    },
    Mutation: {
        addUser: async (_:any, { data } : { data: IUser }) => {
            const user = plainToClass(User, data);
            user.salt = SecurityController.generateSalt();
            user.password = SecurityController.encodePassword(user.password, user.salt);
            return UserManager.save(user).then(res => SecurityController.createSession(res));
        },
    },
};
