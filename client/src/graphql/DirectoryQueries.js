import gql from 'graphql-tag';

export const addDirectory = gql`
    mutation ($name: String!) {
        addDirectory(name: $name) {
            _key
            name
            userKey
        }
    }
`;

export const getDirectories = gql`
    {
        directories {
            _key
            name
            userKey
        }
    }
`;
