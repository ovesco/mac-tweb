import { aql } from 'arangojs';
import EdgeManager from './EdgeManager';
import { IFile } from '../schema/File';

class ActivityFileEdgeManager extends EdgeManager {
    getActivityFiles(activityId: string) : Promise<Array<IFile>> {
        return this.db.query(aql`
        FOR file IN OUTBOUND ${activityId} activity_file RETURN file`)
            .then(cursor => cursor.all());
    }
}

export default new ActivityFileEdgeManager('activity_file');
