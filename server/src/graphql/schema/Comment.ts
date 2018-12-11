import { gql } from 'apollo-server';
import { ISecurityContext } from '../../auth/SecurityController';
import Comment from '../../arango/schema/Comment';
import CommentManager from '../../arango/manager/CommentManager';

export const typeDefs = gql`
    type Comment {
        _id: ID!
        _key: String!
        _from: String!
        _to: String!
        date: String!
        content: String!
        user: User @aql(query: "FOR u IN users FILTER u._id == @current._from RETURN u", single: true)
    }

    extend type Mutation {
        createOrUpdateComment(itemId: ID!, content: String!, commentKey: String): Comment!
    }
`;

export const resolvers = {
    Mutation: {
        createOrUpdateComment: async (_:any, { itemId, commentKey, content }: {itemId: string, commentKey: string, content: string},
                           context: ISecurityContext) => {
            let comment = null;
            if(commentKey) comment = await CommentManager.find(commentKey) as Comment;
            else comment = new Comment(context.user._id, itemId);
            comment.content = content;
            return commentKey ? CommentManager.update(commentKey, comment) : CommentManager.save(comment);
        },

    },
};
