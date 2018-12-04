import { gql } from 'apollo-server';
import ActivityManager from '../../arango/manager/ActivityManager';
import { IActivity } from '../../arango/schema/Activity';
import { getUser } from './Helper';


export const typeDefs = gql`
    extend type Query {
        activity(_key: ID!): Activity
    }

    type Activity {
        _key: ID!
        date: String!
        content: String!
        userKey: ID!
        user: User
        tags: [Tag]
        files: [File]
        comments: [Comment]
    }
`;
export const resolvers = {
    Query: {
        activity: async (_:any, { _key } : { _key: string }) => ActivityManager.find(_key),
    },
    Activity: {
        user: async(parent: IActivity) => getUser(parent.userKey),
    },
};
