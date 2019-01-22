require('dotenv').config();
import { createServer } from 'http';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers, schemaDirectives } from './graphql/Schema';
import SecurityController from './auth/SecurityController';
import FileManager from './arango/manager/FileManager';
import { IFile } from './arango/schema/File';
import Uploader from './fs/Uploader';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: (request: any) => request.req
            ? SecurityController.contextUser(request.req.headers[process.env.SESSION_HEADER] || '')
            : request.connection.context,
    subscriptions: {
        path: '/subscriptions',
        onConnect: (connectionParams:any) => {
            console.log(`Subscription client connected using Apollo server's built-in SubscriptionServer.`);
            return SecurityController.contextUser(connectionParams.token || '');
        },
    },
    formatError(error: any) {
        console.log(error);
        return error;
    },
});

server.applyMiddleware({ app });

/**
 * Only express route, used to retrieve and return a file based
 * on its key
 */
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

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    console.log(`🚀 WS ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
});
