import { gql } from 'apollo-server';
import { merge } from 'lodash';

import SecurityController from '../auth/SecurityController';

// Types
import { typeDefs as activityTypeDefs, resolvers as activityResolvers } from './schema/Activity';
import { typeDefs as commentTypeDefs, resolvers as commentResolvers } from './schema/Comment';
import { typeDefs as fileTypeDefs, resolvers as fileResolvers } from './schema/File';
import { typeDefs as tagTypeDefs, resolvers as tagResolvers } from './schema/Tag';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './schema/User';
import { typeDefs as directoryTypeDefs, resolvers as directoryResolvers } from './schema/Directory';
import { typeDefs as likeTypeDefs, resolvers as likeResolvers } from './schema/Like';
import { typeDefs as AQLTypeDefs, AqlDirective } from './directive/AQLDirective';
import { typeDefs as notificationTypeDefs, resolvers as notificationResolvers } from './schema/Notification';

// Directives
import { typeDefs as capitalizeTypeDefs, CapitalizeDirective } from './directive/Capitalize';

const query = gql`
    type Query {
        version: String
    }

    type Session {
        token: String!
        user: User!
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
            : { username: string, password: string }) => SecurityController.authenticate(username, password),
    },
};

export const typeDefs = [
    query,
    activityTypeDefs,
    commentTypeDefs,
    fileTypeDefs,
    tagTypeDefs,
    userTypeDefs,
    directoryTypeDefs,
    likeTypeDefs,
    notificationTypeDefs,

    capitalizeTypeDefs,
    AQLTypeDefs,
];

export const resolvers = merge(
    queryResolvers,
    activityResolvers,
    commentResolvers,
    fileResolvers,
    tagResolvers,
    userResolvers,
    directoryResolvers,
    likeResolvers,
    notificationResolvers,
);

export const schemaDirectives = {
    capitalize: CapitalizeDirective,
    aql: AqlDirective,
};
