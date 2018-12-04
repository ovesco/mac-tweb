import { gql } from 'apollo-server';
import { merge } from 'lodash';

import Security from '../auth/Security';

import { typeDefs as activityTypeDefs, resolvers as activityResolvers } from './schema/Activity';
import { typeDefs as commentTypeDefs, resolvers as commentResolvers } from './schema/Comment';
import { typeDefs as fileTypeDefs, resolvers as fileResolvers } from './schema/File';
import { typeDefs as tagTypeDefs, resolvers as tagResolvers } from './schema/Tag';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './schema/User';

const query = gql`
    type Session {
        userKey: String!
        localKey: String!
    }

    type Query {
        version: String
    }

    type Mutation {
        login(username: String, password: String): Session
    }
`;

const queryResolvers = {
    Query: {
        version: () => '1.0.0',
    },
    Mutation: {
        login: async (_:any, { username, password }
            : { username: string, password: string }) => Security.authenticate(username, password),
    },
};

export const typeDefs = [
    query,
    activityTypeDefs,
    commentTypeDefs,
    fileTypeDefs,
    tagTypeDefs,
    userTypeDefs,
];

export const resolvers = merge(
    queryResolvers,
    activityResolvers,
    commentResolvers,
    fileResolvers,
    tagResolvers,
    userResolvers,
);
