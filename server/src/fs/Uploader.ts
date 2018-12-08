import { createWriteStream } from 'fs';
import { Stream } from 'stream';
import * as uniqid from 'uniqid';

export default class Uploader {
    static mimeTypeSupported(mime: string): boolean {
        return process.env.SUPPORTED_MIME_TYPES.split(',').indexOf(mime) !== -1;
    }

    static writeStream(filestream: Stream, path: string) {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            const wstream = createWriteStream(path);
            filestream.pipe(wstream);
            wstream.end();
            wstream.on('finish', () => {
                resolve();
            });
            wstream.on('error', (err) => {
                reject(err);
            });
        });
    }

    static buildPath(userKey: string) {
        return `${userKey}/${uniqid()}`;
    }
}
