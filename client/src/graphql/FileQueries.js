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

export const directoryFilesQuery = gql`
    query($id: ID!, $page: Int!, $amount: Int!) {
        directoryFiles(id: $id, page: $page, amount: $amount) {
            files {
                ...fileFragment
            }
            amount
        }
    }
    
    ${fileFragment}
`;

export const uploadQuery = gql`
    mutation uploadFiles($file: ActivityFileInput!) {
        uploadActivityFile(fileInput: $file) {
            ...fileFragment
        }
    }
    
    ${fileFragment}
`;

export const searchQuery = gql`
    query($text: String, $tags: [String]!, $page: Int!, $amount: Int!) {
        searchFiles(text: $text, tags: $tags, page: $page, amount: $amount) {
            files {
                ...fileFragment
            }
            amount
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

export const myFilesQuery = gql`
    query($begin: Int, $amount: Int!) {
        myFiles(begin: $begin, amount: $amount) {
            files {
                ...fileFragment
            }
            amount
        }
    }

    ${fileFragment}
`;
