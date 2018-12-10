import gql from 'graphql-tag';
import { userFragment } from './UserQueries';

export const loginQuery = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            localKey
            user {
                ...userFragment
            }
        }
    }
    
    ${userFragment}
`;

export const registerQuery = gql`
    mutation ($data: UserInput!) {
        addUser(data: $data) {
            localKey
            user {
                ...userFragment
            }
        }
    }

    ${userFragment}
`;
