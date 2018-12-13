import FileSelectionMixin from './FileSelectionMixin';
import { addFileToDirectoryQuery } from '../graphql/DirectoryQueries';

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
            console.log(directory);
            await Promise.all(this.selected.map(file => this.$apollo.mutate({
                mutation: addFileToDirectoryQuery,
                variables: { directoryId: directory._id, fileId: file._id },
            }))).then(() => {
                this.$toasted.success(`Fichiers ajoutés à ${directory.name}`);
            }).catch((e) => {
                this.$toasted.error('Une erreur s\'est malheureusement produite...');
                console.error(e);
            });
        },
    },
};
