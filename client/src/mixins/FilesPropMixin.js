import FileSelectionMixin from './FileSelectionMixin';
import { addFileToDirectoryQuery, directoryQuery } from '../graphql/DirectoryQueries';

export default {
    mixins: [
        FileSelectionMixin,
    ],
    props: {
        files: {
            type: Array,
            required: true,
        },
    },
    methods: {
        async addToDirectory(directory) {
            await Promise.all(this.selected.map(file => this.$apollo.mutate({
                mutation: addFileToDirectoryQuery,
                variables: { directoryId: directory._id, fileId: file._id },
                update: (cache) => {
                    try {
                        const dirCache = cache.readQuery({
                            query: directoryQuery,
                            variables: { directoryKey: directory._key },
                        }).directory;
                        dirCache.files.push(file);
                    } catch (e) {
                        // On a pas encore le dossier en cache, on fait rien
                    }
                },
            }))).then(() => {
                this.$toasted.success(`Fichiers ajoutés à ${directory.name}`);
            }).catch((e) => {
                this.$toasted.error('Une erreur s\'est malheureusement produite...');
                console.error(e);
            });
        },
    },
};
