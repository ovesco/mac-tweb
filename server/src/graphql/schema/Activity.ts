import { gql } from 'apollo-server';
import { plainToClass } from 'class-transformer';
import ActivityManager from '../../arango/manager/ActivityManager';
import Activity, { IActivity } from '../../arango/schema/Activity';
import { ISecurityContext } from '../../auth/Security';
import { getUser } from './Helper';
import FileManager from '../../arango/manager/FileManager';
import TagManager from '../../arango/manager/TagManager';

export const typeDefs = gql`
    extend type Query {
        activity(_key: ID!): Activity
    }

    extend type Mutation {
        addActivity(data: ActivityInput!): Activity
    }

    input ActivityInput {
        content: String!
        filesKey: [String]!
    }

    type Activity {
        _key: ID!
        date: String!
        content: String
        userKey: ID!
        user: User
        tags: [String]
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
        files: async(parent: IActivity) => {
            if(parent.filesKey instanceof Array) {
                return FileManager.findByMultipleKeys(parent.filesKey);
            }
            return [];
        },
    },
    Mutation: {
        addActivity: async (_:any, { data } :  { data: IActivity }, context: ISecurityContext) => {
            const activity = plainToClass(Activity, data);
            activity.userKey = context.user._key;
            return TagManager.extractTags(activity.content).then((tags) => {
                activity.tags = tags;
                return activity;
            });
        },
    },
};
