import { gql } from 'apollo-server';
import FileManager from '../../arango/manager/FileManager';
import Uploader from '../../fs/Uploader';
import { IFile, IActivityFileInput } from '../../arango/schema/File';
import { ISecurityContext } from '../../auth/SecurityController';
import ActivityManager from '../../arango/manager/ActivityManager';
import ActivityFileEdgeManager from '../../arango/manager/ActivityFileEdgeManager';
import ActivityFileEdge from '../../arango/schema/ActivityFileEdge';
import { IActivity } from '../../arango/schema/Activity';
import { LIKE_QUALIFIER } from '../../arango/manager/LikeManager';
import DirectoryFileEdgeManager from '../../arango/manager/DirectoryFileEdgeManager';

export const typeDefs = gql`

    type SearchFiles {
        files: [File]
        amount: Int!
    }

    extend type Query {
        file(_key: ID!): File
        searchFiles(text: String, tags: [String]!, page: Int!, amount: Int!): SearchFiles
        directoryFiles(id: ID!, begin: Int, amount: Int!): [File]
    }

    extend type Mutation {
        uploadActivityFile(fileInput: ActivityFileInput!): File
    }

    input ActivityFileInput {
        activityId: String!
        upload: Upload!
    }

    type File {
        _id: ID!
        _key: ID!
        date: String!
        description: String!
        filename: String!
        mimeType: String!
        size: Int!
        userKey: ID!
        user: User @aql(query: "FOR u IN users FILTER u._key == @current.userKey RETURN u", single: true)
        src: String
        tags: [String]
        likes: [Like] @aql(query: "FOR l IN edges FILTER l._to == @current._id && l._qualifier == '${LIKE_QUALIFIER}' RETURN l")
    }
`;
export const resolvers = {
    Query: {
        file: async (_:any, { _key } : { _key: string }) => FileManager.find(_key),
        searchFiles: (_:any, { text, tags } : { text: string, tags: Array<string> }) => FileManager.search(text, tags, 0, 8),
        directoryFiles: (_:any, { id, begin, amount }: { id: string, begin: number, amount: number }) =>
            DirectoryFileEdgeManager.getDirectoryFiles(id, begin || 0, amount),
    },
    Mutation: {
        uploadActivityFile: async (parent: any, { fileInput } : { fileInput: IActivityFileInput },
                                   context: ISecurityContext) : Promise<IFile> => {
            return ActivityManager.findById(fileInput.activityId).then((activity: IActivity) => {
                return Uploader.saveFile(context.user, fileInput.upload).then((file: IFile) => {
                    const { tags, content } = (activity as IActivity);
                    file.tags = tags;
                    file.description = content;
                    return FileManager.save(file).then((fileUpdated: IFile) => {
                        return ActivityFileEdgeManager
                            .save(new ActivityFileEdge(activity._id, fileUpdated._id))
                            .then(() => fileUpdated);
                    });
                });
            });
        },
    },
};
