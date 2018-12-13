import { gql } from 'apollo-server';
import { plainToClass } from 'class-transformer';
import ActivityManager from '../../arango/manager/ActivityManager';
import Activity, { IActivity } from '../../arango/schema/Activity';
import SecurityController, { ISecurityContext } from '../../auth/SecurityController';
import { getUser } from './Helper';
import TagManager from '../../arango/manager/TagManager';
import ActivityFileEdgeManager from '../../arango/manager/ActivityFileEdgeManager';

export const typeDefs = gql`
    extend type Query {
        activity(_key: ID!): Activity
        feed: [Activity]
    }

    extend type Mutation {
        addActivity(data: ActivityInput!): Activity
        deleteActivity(activityId: ID!): Boolean
    }

    input ActivityInput {
        content: String!
    }

    type Activity {
        _id: ID!
        _key: ID!
        date: String!
        content: String
        userKey: ID!
        user: User
        tags: [String]
        files: [File]!
        likes: [Like] @aql(query: "FOR l IN likes FILTER l._to == @current._id RETURN l")
        comments: [Comment] @aql(query: "For c IN comments FILTER c._to == @current._id SORT c.date ASC RETURN c")
    }
`;

export const resolvers = {
    Query: {
        activity: async (_:any, { _key } : { _key: string }) => ActivityManager.find(_key),
        feed: async (x: any, y: any, context: ISecurityContext) => ActivityManager
            .getUserFeed(SecurityController.extractUser(context)._key),
    },
    Activity: {
        user: async(parent: IActivity) => getUser(parent.userKey),
        files: async(parent: IActivity) => ActivityFileEdgeManager.getActivityFiles(parent._id),
    },
    Mutation: {
        addActivity: async (_:any, { data } :  { data: IActivity },
                            context: ISecurityContext) : Promise<Activity> => {
            const user = SecurityController.extractUser(context);
            const activity = plainToClass(Activity, data);
            activity.userKey = user._key;
            return TagManager.extractTags(activity.content).then((tags) => {
                activity.tags = tags;
                return ActivityManager.save(activity);
            });
        },
        deleteActivity: (_:any, { activityId } : { activityId: string }) : Promise<Boolean> => {
            return ActivityManager.findById(activityId).then((activity) => {
                return ActivityManager.remove(activity).then(() => true).catch(() => false);
            }).catch(() => false);
        },
    },
};
