import { gql } from 'apollo-server';
import { plainToClass } from 'class-transformer';
import UserManager from '../../arango/manager/UserManager';
import User, { IUser } from '../../arango/schema/User';
import SecurityController, { ISecurityContext } from '../../auth/SecurityController';
import LikeManager from '../../arango/manager/LikeManager';
import { LIKE_QUALIFIER } from '../../arango/manager/LikeManager';
import { COMMENT_QUALIFIER } from '../../arango/manager/CommentManager';
import FileManager from '../../arango/manager/FileManager';

export const typeDefs = gql`
    type myFiles {
        files: [File]
        amount: Int!
    }

    extend type Query {
        me: User
        myFiles(begin: Int, amount: Int!): myFiles
        user(_key: ID!): User
        users: [User]
    }

    extend type Mutation {
        addUser(data: UserInput!): Session
        updateMe(data: UpdateUserInput!): User
    }

    input UpdateUserInput {
        name: String
        email: String
        followingTags: [String]
        oldPassword: String
        newPassword: String
    }

    input UserInput {
        username: String!
        name: String!
        email: String!
        password: String!
    }

    type User {
        _id: ID!
        _key: ID!
        date: String!
        username: String!
        name: String! @capitalize
        email: String!
        comments: [Comment] @aql(query: "FOR c IN edges FILTER c.userKey == @current._key && c._qualifier == '${COMMENT_QUALIFIER}' RETURN c")
        likes: [Like] @aql(query: "FOR l IN edges FILTER l._from == @current._id && l._qualifier == '${LIKE_QUALIFIER}' RETURN l")
        reputation: [Like]
        followingTags: [String]!
    }
`;

export const resolvers = {
    Query: {
        me: async (x: any, y: any, context: ISecurityContext) => UserManager.find(context.user._key),
        user: async (_:any, { _key } : { _key: string }) => UserManager.find(_key),
        myFiles: async (x: any, { begin, amount }: { begin:number, amount:number }, context: ISecurityContext) =>
            FileManager.findUserFiles(context.user._key, begin, amount),
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
            return UserManager.save(user).then(res => SecurityController.createAuthResponse(res));
        },
        updateMe: async (_:any, { data } : { data: any }, context: ISecurityContext) => {
            return UserManager.find(context.user._key).then((user: IUser) => {
                if (data.name) user.name = data.name;
                if (data.email) user.email = data.email;
                if (data.followingTags) user.followingTags = data.followingTags;
                if (data.oldPassword || data.newPassword) {
                    console.log(data.oldPassword, user.password);
                    if (SecurityController.encodePassword(data.oldPassword, user.salt) === user.password) {
                        user.password = SecurityController.encodePassword(data.newPassword, user.salt);
                    }
                    else throw Error('Password is not correct');
                }
                return UserManager.update(user._key, plainToClass(User, user));
            });
        },
    },
};
