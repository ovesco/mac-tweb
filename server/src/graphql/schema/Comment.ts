import { gql } from 'apollo-server';
import { ISecurityContext } from '../../auth/SecurityController';
import Comment from '../../arango/schema/Comment';
import CommentManager from '../../arango/manager/CommentManager';
import { plainToClass } from 'class-transformer';
import NotificationManager from "../../arango/manager/NotificationManager";

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
        createOrUpdateComment(itemId: ID, content: String!, commentKey: String): Comment!
        deleteComment(commentId: ID!): Boolean
    }
`;

export const resolvers = {
    Mutation: {
        createOrUpdateComment: async (_:any, { itemId, commentKey, content }: {itemId: string, commentKey: string, content: string},
                           context: ISecurityContext) => {
            let comment = null;
            if(commentKey) comment = await CommentManager.find(commentKey) as Comment;
            else if(itemId) comment = new Comment(context.user._id, itemId);
            else throw new Error('Missing some data man.');
            comment.content = content;
            return commentKey
                ? CommentManager.update(commentKey, plainToClass(Comment, comment))
                : CommentManager.save(comment).then((result) => {
                    return NotificationManager.findOwnerId(itemId).then((ownerId) => {
                        return NotificationManager.addNotification(ownerId, itemId, context.user._key, 'comment')
                            .then(() => result);
                    });
                });
        },
        deleteComment: async (_:any, { commentId } : { commentId: string }, context: ISecurityContext) => {
            return CommentManager.findOneBy({ _id: commentId, _from: context.user._id }, true).then((res) => {
                if(res) return CommentManager.remove(res).then(() => true).catch(() => false);
                throw new Error('Comment not found thus not removed');
            });
        },
    },
};
