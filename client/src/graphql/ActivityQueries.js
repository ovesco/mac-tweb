import gql from 'graphql-tag';
import { likeFragment } from './LikeQueries';
import { fileFragment } from './FileQueries';
import { commentFragment } from './CommentQueries';

export const activityFragment = gql`
    fragment activityFragment on Activity {
        _id
        _key
        date
        content
        files {
            ...fileFragment
        }
        likes {
            ...likeFragment
        }
        comments {
            ...commentFragment
        }
        user {
            _key
            name
        }
    }

    ${fileFragment}
    ${likeFragment}
    ${commentFragment}
`;

export const addActivityQuery = gql`
    mutation($data: ActivityInput!) {
        addActivity(data: $data) {
            ...activityFragment
        }
    }
    
    ${activityFragment}
`;

export const deleteActivityQuery = gql`
    mutation($activityId: ID!) {
        deleteActivity(activityId: $activityId)
    }
`;

export const myActivitiesQuery = gql`
    query {
        myActivities {
            ...activityFragment
        }
    }
    
    ${activityFragment}
`;

export const feedQuery = gql`
    query {
        feed {
            ...activityFragment
        }
    }

    ${activityFragment}
`;
