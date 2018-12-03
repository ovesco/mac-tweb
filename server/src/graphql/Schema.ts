import { gql } from 'apollo-server';
import { merge } from 'lodash';
import { mergeTypes } from 'merge-graphql-schemas';

import activity from './schema/Activity';
import comment from './schema/Comment';
import file from './schema/File';
import tag from './schema/Tag';
import user from './schema/User';

const query = gql`
    type Query {
        _empty: String
    }
`;

const typedefs = mergeTypes([
    query,
    activity.typeDefs,
    comment.typeDefs,
    file.typeDefs,
    tag.typeDefs,
    user.typeDefs,
]);

const resolvers = merge(
    activity.resolvers,
    comment.resolvers,
    file.resolvers,
    tag.resolvers,
    user.resolvers,
);

export default { typedefs, resolvers };
