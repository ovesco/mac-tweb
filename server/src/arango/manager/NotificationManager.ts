import { aql } from 'arangojs';
import EdgeManager from './EdgeManager';
import Notification from '../schema/Notification';
import { USERS_COLLECTION } from './UserManager';
import pubSub, { NOTIFICATION } from '../../graphql/Subscriber';

export const NOTIFICATION_QUALIFIER = 'notifications';

class NotificationManager extends EdgeManager {
    /**
     * Adds a notification and publish it
     * @param from dude notified
     * @param to object of notification
     * @param performerKey dude who made the notification
     * @param type like or comment
     */
    async addNotification(from: string, to: string, performerKey: string, type: string): Promise<any> {
        const notification = new Notification(from, to, performerKey, type);
        if (from.split('/').pop() !== performerKey) {
            return this.save(notification)
                .then(notif => pubSub.publish(NOTIFICATION, { notified: notif }));
        }
        return new Promise((resolve) => { resolve(); });
    }

    /**
     * Gets last unread notifications
     * @param userId
     */
    async lastNotifications(userId: string) {
        console.log(userId);
        return this.findBy({
            _from: userId,
            read: false,
        }).then((data) => {
            console.log(data);
            return data;
        });
    }

    /**
     * Marks a set of notifications as read
     * @param keys
     */
    async markReadNotifications(keys: Array<string>) {
        return this.query(aql`
            FOR n IN ${this.collection}
                FOR k IN ${keys}
                    UPDATE { _key: k, read: true } IN ${this.collection}
        `);
    }

    /**
     * Finds owner of an object, either comment or like
     * @param itemId
     */
    async findOwnerId(itemId: string) {
        return this.findItemById(itemId).then(res => res === null ? null : `${USERS_COLLECTION}/${res.userKey}`);
    }

    /**
     * an object based on its ID from whichever collection it belongs to
     * @param itemId
     */
    async findItemById(itemId: string) {
        const collection = itemId.split('/').shift();
        return this.query(aql`
            FOR x IN ${this.db.collection(collection)}
                FILTER x._id == ${itemId}
                RETURN x
        `).then(cursor => cursor.all())
            .then(data => data.length === 1 ? data.shift() : null);
    }
}

export default new NotificationManager(NOTIFICATION_QUALIFIER);
