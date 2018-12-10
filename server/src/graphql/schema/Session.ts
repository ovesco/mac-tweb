import { gql } from 'apollo-server';
import { ISession } from "../../arango/schema/Session";

export const typeDefs = gql`
    type Session {
        userKey: String!
        localKey: String!
        user: User! @aql(query: "FOR u IN users FILTER u._key == @current.userKey RETURN u", single: true)
    }
`;
export const resolvers = {};
