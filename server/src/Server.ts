require('dotenv').config();
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers, schemaDirectives } from './graphql/Schema';
import SecurityController from './auth/SecurityController';
import FileManager from './arango/manager/FileManager';
import { IFile } from './arango/schema/File';
import Uploader from './fs/Uploader';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: SecurityController.context,
});

const app = express();
server.applyMiddleware({ app });

app.get('/file/:fileKey', (req, res) => {
    const fileKey = req.params.fileKey;
    if(fileKey) {
        FileManager.find(fileKey).then((file: IFile) => {
            res.setHeader('content-type', file.mimeType);
            Uploader.streamFile(file.src).pipe(res);
        }).catch(() => {
            res.send('no file found mate');
        });
    } else {
        res.send('no key provided mate');
    }
});

app.listen({ port: 4000 }, () => {
    console.log('running');
});
