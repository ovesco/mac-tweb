import gql from 'graphql-tag';

export const tagFragment = gql`
    fragment tagFragment on Tag {
        _id
        tag
        date
    }
`;

export const tagsQuery = gql`
    query($search: String) {
        tags(search: $search) {
            ...tagFragment
        }
    }
    
    ${tagFragment}
`;
