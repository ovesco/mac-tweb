import * as fs from 'fs';
import { Stream } from 'stream';
import * as uniqid from 'uniqid';
import File from '../arango/schema/File';
import { IUser } from '../arango/schema/User';

export default class Uploader {
    static defaultMimes(): Array<string> {
        return process.env.SUPPORTED_MIME_TYPES.split(',');
    }

    static mimeTypeSupported(mimes: Array<string>, mime: string): boolean {
        return mimes.indexOf(mime) !== -1;
    }

    static streamFile(src: string) : fs.ReadStream {
        return fs.createReadStream(__dirname + '/' + src);
    }

    static writeStream(filestream: Stream, dirname: string, path: string) {
        return new Promise((resolve, reject) => {
            const directory = __dirname + '/' + dirname;
            const filepath = __dirname + '/' + path;
            if(!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
            const wstream = fs.createWriteStream(filepath);
            filestream.pipe(wstream);
            wstream.on('finish', () => {
                const stats = fs.statSync(filepath);
                resolve(stats.size);
            });
            wstream.on('error', (err) => {
                reject(err);
            });
        });
    }

    static async saveFile(user: IUser, fileInput: Promise<object>, mimes: Array<string>): Promise<File> {
        // @ts-ignore
        const { stream, filename, mimetype } = await fileInput;
        if(!Uploader.mimeTypeSupported(mimes, mimetype)) throw new Error('Unsupported mime type');

        // Create file
        const file = new File();
        file.filename = filename;
        file.src = Uploader.buildPath(user._key);
        file.mimeType = mimetype;
        file.userKey = user._key;

        return Uploader.writeStream(stream, user._key, file.src).then((size: number) => {
            file.size = size;
            return file;
        });
    }

    static buildPath(userKey: string) {
        return `${userKey}/${uniqid()}`;
    }
}
