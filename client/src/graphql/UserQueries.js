import gql from 'graphql-tag';
import { likeFragment } from './LikeQueries';

export const userFragment = gql`
    fragment userFragment on User {
        _id
        _key
        username
        name
        email
        followingTags
        reputation {
            ...likeFragment
        }
    }
    
    ${likeFragment}
`;

export const userQuery = gql`
    query($userKey: ID!) {
        user(_key: $userKey) {
            ...userFragment
        }
    }
    
    ${userFragment}
`;

export const meQuery = gql`
    query {
        me {
            ...userFragment
        }
    }
    
    ${userFragment}
`;

export const updateMeMutation = gql`
    mutation($data: UpdateUserInput!) {
        updateMe(data: $data) {
            ...userFragment
        }
    }
    
    ${userFragment}
`;
