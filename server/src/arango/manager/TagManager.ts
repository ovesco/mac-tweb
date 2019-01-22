import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import Tag from '../schema/Tag';

class TagManager extends AbstractManager {
    /**
     * Extracts tags from a string and return them
     * @param content string to extract tags from
     */
    extractTags(content: string) : Promise<Array<string>> {
        // Extract hashtags and remove # char
        const extract = content.match(/#[a-z0-9_]+/g);
        if (extract === null) {
            return new Promise((resolve) => {
                resolve([]);
            });
        }
        const hashtags = extract.map(hashtag => hashtag.substr(1).toLowerCase());
        return this.query(aql`FOR t IN ${this.collection} FILTER t.tag IN ${hashtags} RETURN t.tag`)
            .then(cursor => cursor.all()).then((existingTags) => {
                // for each non existing tag, add it in DB
                const diff = hashtags.filter(tag => !existingTags.includes(tag));
                const newTags = diff.map(tag => new Tag(tag));
                return this.collection.import(newTags).then(() => hashtags);
            });
    }

    /**
     * Search some hashtag based on a given needle
     * @param needle
     */
    search(needle: string) : Promise<Array<Tag>> {
        const searchItem = `%${needle}%`;
        return this.query(aql`FOR t IN ${this.collection} FILTER t.tag LIKE ${searchItem} LIMIT 5 RETURN t`)
            .then(cursor => cursor.all());
    }
}

export default new TagManager('tags');
