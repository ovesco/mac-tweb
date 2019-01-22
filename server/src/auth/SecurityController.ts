import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserManager from '../arango/manager/UserManager';
import User, { IUser } from '../arango/schema/User';

/**
 * The global context available in apollo
 */
export interface ISecurityContext {
    user: IUser;
}

/**
 * A session object
 */
export interface ISession {
    token: string;
    user: IUser;
}

/**
 * The JWT payload
 */
export interface IPayload {
    userKey: string;
}

class SecurityController {
    /**
     * Checks if a username and password match with a user in the system
     * and returns a Session object if yes
     * @param username
     * @param password
     */
    static authenticate(username: string, password: string): Promise<ISession> {
        console.log(1);
        return UserManager.findByUsername(username).then((user) => {
            console.log(2);
            if(user !== null && user.password === SecurityController.encodePassword(password, user.salt)) {
                return SecurityController.createAuthResponse(user);
            }
            return null;
        });
    }

    /**
     * Build a Session response for a given user to be returned
     * @param user
     */
    static createAuthResponse(user: IUser): ISession {
        console.log(user);
        return {
            token: SecurityController.createJWT(user),
            user,
        };
    }

    /**
     * Builds a JWT for the given user
     * @param user
     */
    static createJWT(user: IUser): string {
        return jwt.sign({
            userKey: user._key,
        }, process.env.JWT_SECRET);
    }

    /**
     * Retrieves the user linked to the given JWT
     * @param token
     */
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

    /**
     * Called by apollo to build the global context
     * @param token
     */
    static async contextUser(token: string) {
        return token === '' ? null : SecurityController.jwtToUser(token)
            .then(user => user ? { user } : null).catch(() => null);
    }

    /**
     * Encodes a password
     * @param clear
     * @param salt
     */
    static encodePassword(clear: string, salt: string): string {
        return bcrypt.hashSync(clear, salt);
    }

    /**
     * Generates a salt for a given user
     */
    static generateSalt(): string {
        return bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
    }
}

export default SecurityController;
