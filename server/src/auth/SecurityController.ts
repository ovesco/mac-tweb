import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserManager from '../arango/manager/UserManager';
import User, { IUser } from '../arango/schema/User';

export interface ISecurityContext {
    user: IUser;
}

export interface ISession {
    token: string;
    user: IUser;
}

export interface IPayload {
    userKey: string;
}

class SecurityController {
    static authenticate(username: string, password: string): Promise<ISession> {
        return UserManager.findByUsername(username).then((user) => {
            if(user !== null && user.password === SecurityController.encodePassword(password, user.salt)) {
                return SecurityController.createAuthResponse(user);
            }
            return null;
        });
    }

    static createAuthResponse(user: IUser): ISession {
        console.log(user);
        return {
            token: SecurityController.createJWT(user),
            user,
        };
    }

    static createJWT(user: IUser): string {
        return jwt.sign({
            userKey: user._key,
        }, process.env.JWT_SECRET);
    }

    static jwtToUser(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as IPayload;
            return UserManager.find(decoded.userKey);
        } catch (err) {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
    }

    static async contextUser(token: string) {
        return token === '' ? null : SecurityController.jwtToUser(token)
            .then(user => user ? { user } : null).catch(() => null);
    }

    static encodePassword(clear: string, salt: string): string {
        return bcrypt.hashSync(clear, salt);
    }

    static generateSalt(): string {
        return bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
    }
}

export default SecurityController;
