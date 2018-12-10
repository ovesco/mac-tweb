import gql from 'graphql-tag';
import { likeFragment } from './LikeQueries';
import { fileFragment } from './FileQueries';

export const addActivityQuery = gql`
    mutation($data: ActivityInput!) {
        addActivity(data: $data) {
            _id
            _key
            date
            content
            userKey
        }
    }
`;

export const feedQuery = gql`
    query {
        feed {
            _id
            _key
            user {
                _key
                username
                name
            }
            content
            date
            files {
                ...fileFragment
            }
            likes {
                ...likeFragment
            }
        }
    }

    ${fileFragment}
    ${likeFragment}
`;
