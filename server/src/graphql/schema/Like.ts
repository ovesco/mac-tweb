import { gql } from 'apollo-server';
import { ISecurityContext } from '../../auth/SecurityController';
import LikeManager from '../../arango/manager/LikeManager';
import Like, { ILike, LikeType } from '../../arango/schema/Like';
import NotificationManager from '../../arango/manager/NotificationManager';

export const typeDefs = gql`
    extend type Mutation {
        like(itemId: String!, type: LikeType!): Like
    }

    enum LikeType {
        LIKE
        STAR
        SAVE
        DELETE
    }

    type Like {
        _id: ID!
        _key: ID!
        _from: String
        _to: String
        type: LikeType
        date: String
        user: User @aql(query: "FOR u IN users FILTER u._id == @current._from RETURN u", single: true)
    }
`;
export const resolvers = {
    Mutation: {
        like: async (_: any, { itemId, type } : { itemId: string, type: string },
                     context: ISecurityContext) : Promise<ILike> => {
            if (type === 'DELETE') {
                // Remove existing like
                return LikeManager.findOneBy({ _from: context.user._id, _to: itemId }, true)
                    .then((res: ILike) => {
                        return res ? LikeManager.remove(res).then(() => null) : null;
                    });
            }

            const like = new Like(context.user._id, itemId);
            if (type === LikeType.STAR) like.type = LikeType.STAR;
            else if (type === LikeType.SAVE) like.type = LikeType.SAVE;
            else like.type = LikeType.LIKE;
            return LikeManager.saveIfNoExist(like).catch(() => {
                return null;
            }).then((res) => {
                return NotificationManager.findOwnerId(itemId).then((ownerId) => {
                    return NotificationManager.addNotification(ownerId, itemId, context.user._key,
                    'like').then(() => {
                        return res;
                    });
                });
            });
        },
    },
};
