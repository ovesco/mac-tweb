import * as uniqid from 'uniqid';
import SessionManager from '../arango/manager/SessionManager';
import UserManager from '../arango/manager/UserManager';
import { IUser } from '../arango/schema/User';
import Session, { ISession } from '../arango/schema/Session';

class Security {
    authenticate(username: string, password: string): Promise<ISession> {
        return UserManager.findByUsername(username).then((user) => {
            if(user !== null && user.password === password) {
                return this.createSession(user);
            }
            return null;
        });
    }

    createSession(user: IUser) : Promise<ISession> {
        const session = new Session();
        session.userKey = user._key;
        session.localKey = uniqid();
        return SessionManager.save(session);
    }

    async context({ req } : { req: any}) {
        const token = req.headers[process.env.SESSION_HEADER] || '';
        return SessionManager.findOneBy({ localKey: token }, true).then(
            (session: ISession) => session === null
                ? null
                : UserManager.find(session.userKey).then(user => user === null ? null : { user }));
    }
}

export default new Security();
