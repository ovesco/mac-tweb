import gql from 'graphql-tag';
import { userFragment } from './UserQueries';

export const loginQuery = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
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
            token
            user {
                ...userFragment
            }
        }
    }

    ${userFragment}
`;
