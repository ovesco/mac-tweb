import Joi from 'joi';
import Activity from './Activity';

export default class FileActivity extends Activity {
    files: Array<string>;

    static getSchema() : object {
        return Joi.object().keys({
            files: Joi.array().min(1).required(),
        });
    }
}
