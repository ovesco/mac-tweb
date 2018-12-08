import gql from 'graphql-tag';

export const loginQuery = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            localKey
        }
    }
`;

export const registerQuery = gql`
    mutation ($data: UserInput!) {
        addUser(data: $data) {
            localKey
        }
    }
`;
