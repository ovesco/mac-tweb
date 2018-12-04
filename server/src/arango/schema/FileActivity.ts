import * as Joi from 'joi';
import Activity, { IActivity } from './Activity';

export interface IFileActivity extends IActivity {
    filesKey: Array<string>;
}

export default class FileActivity extends Activity implements IFileActivity {
    filesKey: Array<string>;

    getSchema() : object {
        return Joi.object().keys({
            filesKey: Joi.array().min(1).required(),
        });
    }
}
