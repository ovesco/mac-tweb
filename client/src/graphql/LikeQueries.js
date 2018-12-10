import gql from 'graphql-tag';

export const likeFragment = gql`
    fragment likeFragment on Like {
        _id
        _from
        _to
        date
        type
        userKey
        user {
            name
        }
    }
`;

export const LikeQuery = gql`
    mutation ($itemId: String!, $type: LikeType!) {
        like(type : $type, itemId: $itemId) {
            ...likeFragment
        }
    }

    ${likeFragment}
`;
