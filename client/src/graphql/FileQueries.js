import gql from 'graphql-tag';

export const uploadQuery = gql`
    mutation uploadFiles($files: [FileInput]!) {
        uploadFiles(files: $files) {
            _key
            date
            description
            filename
            mimeType
            size
            userKey
            src
            tags {
                tag
            }
        }
    }
`;

export const query = '';
