import gql from 'graphql-tag';
import { userFragment } from './UserQueries';
import { fileFragment } from './FileQueries';

export const directoryFragment = gql`
    fragment directoryFragment on Directory {
        _id
        _key
        name
        user {
            ...userFragment
        }
    }
    
    ${userFragment}
`;

export const addFileToDirectoryQuery = gql`
    mutation ($directoryId: ID!, $fileId: ID!) {
        addFileToDirectory(directoryId: $directoryId, fileId: $fileId) {
            ...fileFragment
        }
    }
    
    ${fileFragment}
`;

export const removeFileFromDirectoryQuery = gql`
    mutation ($directoryId: ID!, $fileId: ID!) {
        removeFileFromDirectory(directoryId: $directoryId, fileId: $fileId)
    }
`;

export const addDirectory = gql`
    mutation ($name: String!) {
        addDirectory(name: $name) {
            ...directoryFragment
        }
    }
    
    ${directoryFragment}
`;

export const directoryQuery = gql`
    query($directoryKey: ID!) {
        directory(_key: $directoryKey) {
            ...directoryFragment
        }
    }

    ${directoryFragment}
`;

export const directoriesQuery = gql`
    {
        directories {
            ...directoryFragment
        }
    }

    ${directoryFragment}
`;
