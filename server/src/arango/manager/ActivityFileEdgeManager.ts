import { aql } from 'arangojs';
import EdgeManager from './EdgeManager';
import { IFile } from '../schema/File';

const ACTIVITY_FILE_QUALIFIER = 'activity_file';

class ActivityFileEdgeManager extends EdgeManager {
    getActivityFiles(activityId: string) : Promise<Array<IFile>> {
        return this.query(aql`
        FOR file IN OUTBOUND ${activityId} ${this.collection} RETURN file`)
            .then(cursor => cursor.all());
    }
}

export default new ActivityFileEdgeManager(ACTIVITY_FILE_QUALIFIER);
