import gql from 'graphql-tag';
import { userFragment } from './UserQueries';
import { activityFragment } from './ActivityQueries';
import { fileFragment } from './FileQueries';

export const NotificationFragment = gql`
    fragment NotificationFragment on Notification {
        _key
        _from
        _to
        date
        type
        read
        target {
            ... on Activity {
                ...activityFragment
            }
            ... on File {
                ...fileFragment
            }
        }
        performer {
            ...userFragment
        }
    }
    
    ${activityFragment}
    ${fileFragment}
    ${userFragment}
`;

export const NotifiedSubscription = gql`
    subscription notifications {
        notified {
            ...NotificationFragment
        }
    }
    
    ${NotificationFragment}
`;

export const readNotificationsMutation = gql`
    mutation($keys: [ID]) {
        readNotifications(keys: $keys)
    }
`;

export const lastNotificationsQuery = gql`
    query lastNotifications {
        lastNotifications {
            ...NotificationFragment
        }
    }
    
    ${NotificationFragment}
`;
