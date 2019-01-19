import * as Joi from 'joi';

import Base, { IBase } from './Base';

export interface IActivity extends IBase {
    content?: string;
    userKey: string;
    tags?: Array<string>;
}

export default class Activity extends Base implements IActivity {
    content?: string;
    userKey: string;
    tags: Array<string>;

    constructor() {
        super();
        this.tags = [];
    }

    buildSchema() : object {
        return {
            content: Joi.string(),
            userKey: Joi.string().required(),
            tags: Joi.array(),
        };
    }
}
