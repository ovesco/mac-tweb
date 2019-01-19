import gql from 'graphql-tag';
import { userFragment } from './UserQueries';

export const commentFragment = gql`
    fragment commentFragment on Comment {
        _id
        _key
        _to
        date
        content
        user {
            ...userFragment
        }
    }

    ${userFragment}
`;

export const activityCommentCache = {
    read: gql`
        fragment searchCommentActivity on Activity {
            comments {
                ...commentFragment
            }
        }
        ${commentFragment}
    `,
    write: gql`
        fragment updateCommentActivity on Activity {
            comments {
                ...commentFragment
            }
        }
        ${commentFragment}
    `,
};

export const createOrUpdateComment = gql`
    mutation($content: String!, $itemId: ID, $commentKey: String) {
        createOrUpdateComment(content: $content, itemId: $itemId, commentKey: $commentKey) {
            ...commentFragment
        }
    }

    ${commentFragment}
`;

export const deleteComment = gql`
    mutation($commentId: ID!) {
        deleteComment(commentId: $commentId)
    }
`;
