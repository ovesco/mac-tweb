import * as uniqid from 'uniqid';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import SessionManager from '../arango/manager/SessionManager';
import UserManager from '../arango/manager/UserManager';
import { IUser } from '../arango/schema/User';
import Session, { ISession } from '../arango/schema/Session';

export interface ISecurityContext {
    user: IUser
}

class SecurityController {
    authenticate(username: string, password: string): Promise<ISession> {
        return UserManager.findByUsername(username).then((user) => {
            if(user !== null && user.password === this.encodePassword(password, user.salt)) {
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

    createJWT(user: IUser): string {
        const payload = {
            _key: user._key,
        };

        const privateKey = fs.readFileSync('../../key/private.key', 'utf8');

        const signOptions = {
            issuer: 'colibri',
            subject: user._key,
            audience: 'http://localhost:4000',
        };

        return jwt.sign(payload, privateKey, signOptions);
    }

    async context({ req } : { req: any}) {
        const token = (req.headers[process.env.SESSION_HEADER] || '').replace('Bearer ', '');
        return SessionManager.findOneBy({ localKey: token }, true).then(
            (session: ISession) => session === null
                ? null
                : UserManager.find(session.userKey).then(user => user === null ? null : { user }));
    }

    encodePassword(clear: string, salt: string): string {
        return bcrypt.hashSync(clear, salt);
    }

    generateSalt(): string {
        return bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
    }
}

export default new SecurityController();
