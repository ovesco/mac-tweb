<template>
    <div>
        <files-viewer :files.sync="directoryFiles" @amount="changedAmount">
            <template slot="actions">
                <button class="btn btn-white mr-2" @click="removeFiles"
                        v-if="selected.length > 0">
                    <icon icon="trash" class="text-black-50 mr-1" />
                    Retirer {{ selected.length }} fichiers
                </button>
            </template>
        </files-viewer>
        <el-pagination layout="pager" class="mt-2"
                       :background="true"
                       :current-page.sync="page"
                       :page-size="filesPerPage"
                       :total="directory.filesAmount">
        </el-pagination>
    </div>
</template>

<script>
import filesViewer from './FilesViewer.vue';
import fileSelectionMixin from '../../mixins/FileSelectionMixin';
import { directoryFilesQuery } from '../../graphql/FileQueries';
import { removeFileFromDirectoryQuery } from '../../graphql/DirectoryQueries';

export default {
    mixins: [fileSelectionMixin],
    components: {
        filesViewer,
    },
    props: ['directory'],
    apollo: {
        directoryFiles: {
            query: directoryFilesQuery,
            variables() {
                return {
                    begin: this.currentPage,
                    amount: this.filesPerPage,
                    id: this.directory._id,
                };
            },
        },
    },
    watch: {
        directory() {
            this.page = 1;
        },
    },
    methods: {
        changedAmount(value) {
            this.filesPerPage = value;
        },
        removeFiles() {
            Promise.all(this.selected.map(f => this.$apollo.mutate({
                mutation: removeFileFromDirectoryQuery,
                variables: { fileId: f._id, directoryId: this.directory._id },
                update: () => {
                    const index = this.directoryFiles.indexOf(f);
                    if (index > -1) this.directoryFiles.splice(index, 1);
                    this.directoryFiles.forEach((curr) => {
                        // eslint-disable-next-line
                        curr.selected = false;
                    });
                },
            }))).then(() => {
                this.$toasted.info('Fichiers retirés');
            });
        },
    },
    data() {
        return {
            directoryFiles: [],
            filesPerPage: 8,
            page: 1,
        };
    },
    computed: {
        currentPage() {
            return this.page - 1;
        },
        selected() {
            return this.directoryFiles.filter(file => file.selected);
        },
    },
};
</script>
