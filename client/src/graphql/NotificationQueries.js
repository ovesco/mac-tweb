import gql from 'graphql-tag';
import { userFragment } from './UserQueries';
import { fileFragment } from './FileQueries';

export const NotificationFragment = gql`
    fragment NotificationFragment on Notification {
        _id
        _key
        _from
        _to
        date
        type
        read
        target {
            ... on Activity {
                _id
            }
            ... on File {
                ...fileFragment
            }
        }
        performer {
            ...userFragment
        }
    }
    
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
