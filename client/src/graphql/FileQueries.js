import gql from 'graphql-tag';
import { likeFragment } from './LikeQueries';
import { userFragment } from './UserQueries';

export const fileFragment = gql`
    fragment fileFragment on File {
        _id
        _key
        filename
        date
        size
        mimeType
        tags
        user {
            ...userFragment
        }
        likes {
            ...likeFragment
        }
    }

    ${userFragment}
    ${likeFragment}
`;

export const uploadQuery = gql`
    mutation uploadFiles($file: ActivityFileInput!) {
        uploadActivityFile(fileInput: $file) {
            ...fileFragment
        }
    }
    
    ${fileFragment}
`;

export const fileQuery = gql`
    query($fileKey: ID!) {
        file(_key: $fileKey) {
            ...fileFragment
        }
    }
    
    ${fileFragment}
`;
