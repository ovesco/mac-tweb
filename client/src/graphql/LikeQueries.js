import gql from 'graphql-tag';

export const likeFragment = gql`
    fragment likeFragment on Like {
        _id
        _from
        _to
        date
        type
        user {
            name
        }
    }
`;

export const likeCacheFragments = {
    file: {
        read: gql`
            fragment searchLikesFile on File {
                likes {
                    ...likeFragment
                }
            }
            ${likeFragment}
        `,
        write: gql`
            fragment updateLikesFile on File {
                likes {
                    ...likeFragment
                }
            }
            ${likeFragment}
        `,
    },
    activity: {
        read: gql`
            fragment searchLikesActivity on Activity {
                likes {
                    ...likeFragment
                }
            }
            ${likeFragment}
        `,
        write: gql`
            fragment updateLikesActivity on Activity {
                likes {
                    ...likeFragment
                }
            }
            ${likeFragment}
        `,
    },
};

export const LikeQuery = gql`
    mutation ($itemId: String!, $type: LikeType!) {
        like(type : $type, itemId: $itemId) {
            ...likeFragment
        }
    }

    ${likeFragment}
`;
