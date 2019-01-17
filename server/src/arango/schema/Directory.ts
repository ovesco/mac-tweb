import * as Joi from 'joi';

import Base, { IBase } from './Base';

export interface IDirectory extends IBase {
    name: string;
    userKey: string;
}

export default class Directory extends Base implements IDirectory {
    constructor(public name: string, public userKey: string) {
        super();
    }

    buildSchema() : object {
        return {
            name: Joi.string().min(2).required(),
            userKey: Joi.string().required(),
        };
    }
}
