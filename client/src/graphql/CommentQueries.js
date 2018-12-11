import gql from 'graphql-tag';

export const commentFragment = gql`
    fragment commentFragment on Comment {
        _id
        _key
        date
        content
        user {
            _key
            name
        }
    }
`;

export const createOrUpdateComment = gql`
    mutation($content: String!, $itemId: ID!, $commentKey: String) {
        createOrUpdateComment(content: $content, itemId: $itemId, commentKey: $commentKey) {
            ...commentFragment
        }
    }

    ${commentFragment}
`;
