import { gql, withFilter } from 'apollo-server';
import pubSub, { NOTIFICATION } from '../Subscriber';
import { INotification } from '../../arango/schema/Notification';
import NotificationManager from '../../arango/manager/NotificationManager';
import { ISecurityContext } from '../../auth/SecurityController';

export const typeDefs = gql`

    union NotificationTarget = File | Activity

    type Notification {
        _id: ID!
        _key: String!
        _from: String!
        _to: String!
        date: String!
        read: Boolean!
        type: String!
        performerKey: String!
        target: NotificationTarget
        performer: User @aql(query: "FOR u IN users FILTER u._key == @current.performerKey RETURN u", single: true)
    }

    type Subscription {
        notified: Notification
    }

    extend type Mutation {
        readNotifications(keys: [ID]): Boolean
    }

    extend type Query {
        lastNotifications: [Notification]
    }
`;
export const resolvers = {
    Subscription: {
        notified: {
            subscribe: withFilter(
                () => pubSub.asyncIterator(NOTIFICATION),
                (payload: any, variables: any, context: ISecurityContext) => {
                    return payload.notified._from === context.user._id;
                },
            ),
        },
    },
    NotificationTarget: {
        __resolveType: (obj: any) => obj._id.split('/').shift() === 'files' ? 'File' : 'Activity',
    },
    Notification: {
        target: (notification: INotification) => NotificationManager.findItemById(notification._to),
    },
    Mutation: {
        readNotifications: (x:any, { keys } : { keys: Array<string> }) =>
            keys ? NotificationManager.markReadNotifications(keys).then(() => true) : false,
    },
    Query: {
        lastNotifications: (x:any, y:any, context: ISecurityContext) =>
            NotificationManager.lastNotifications(context.user._id),
    },
};
