import gql from 'graphql-tag';
import { likeFragment } from './LikeQueries';

export const fileFragment = gql`
    fragment fileFragment on File {
        _id
        _key
        filename
        date
        size
        mimeType
        userKey
        tags
        likes {
            ...likeFragment
        }
    }

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
