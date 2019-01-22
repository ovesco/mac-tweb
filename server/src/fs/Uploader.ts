import * as fs from 'fs';
import { Stream } from 'stream';
import * as uniqid from 'uniqid';
import File from '../arango/schema/File';
import { IUser } from '../arango/schema/User';

export default class Uploader {

    /**
     * Retrieves list of supported mime defined in environment variables
     */
    static defaultMimes(): Array<string> {
        return process.env.SUPPORTED_MIME_TYPES.split(',');
    }

    /**
     * Checks if a given mime is supported
     * @param mimes list of supported mimes
     * @param mime type to check
     */
    static mimeTypeSupported(mimes: Array<string>, mime: string): boolean {
        return mimes.indexOf(mime) !== -1;
    }

    /**
     * Creates a read stream on the given file src path
     * @param src
     */
    static streamFile(src: string) : fs.ReadStream {
        return fs.createReadStream(__dirname + '/' + src);
    }

    /**
     * Writes a given read stream onto a file on the server
     * @param filestream read stream
     * @param dirname directory where to put the file
     * @param path filename
     */
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

    /**
     * Saves a given file and links it with the given user
     * @param user
     * @param fileInput object given by apollo on file upload
     * @param mimes list of accepted mime types
     */
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

    /**
     * Builds a path for the given user key
     * @param userKey
     */
    static buildPath(userKey: string) {
        return `${userKey}/${uniqid()}`;
    }
}
