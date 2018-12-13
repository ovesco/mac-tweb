<template>
    <div>
        <div class="files p-lg-5">
            <div class="container-lg">
                <div class="row no-gutters">
                    <div class="col-lg-3 pr-lg-5">
                        <div class="lg-flex mb-lg-5">
                            <new-directory-button />
                        </div>
                        <el-card shadow="never">
                            <directory-list :show-mines="true"
                                            v-on:directory-selected="selectedDirectory"
                                            v-on:myfiles-selected="selectedMyfiles" />
                        </el-card>
                    </div>
                    <div class="col-lg-9">
                        <files-viewer :files.sync="files">
                            <template slot="actions">
                                <button class="btn btn-white mr-2" @click="removeFiles"
                                    v-if="selected.length > 0 && !myFiles">
                                    <icon icon="trash" class="text-black-50 mr-1" />
                                    Retirer {{ selected.length }} fichiers
                                </button>
                            </template>
                        </files-viewer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import filesViewer from '../components/files/FilesViewer.vue';
    import newDirectoryButton from '../components/directories/NewDirectoryButton.vue';
    import directoryList from '../components/directories/DirectoryList.vue';
    import fileSelectionMixin from '../mixins/FileSelectionMixin';
    import { meQuery } from '../graphql/UserQueries';
    import { directoryQuery, removeFileFromDirectoryQuery } from '../graphql/DirectoryQueries';

    export default {
        mixins: [fileSelectionMixin],
        components: {
            newDirectoryButton,
            filesViewer,
            directoryList,
        },
        methods: {
            selectedDirectory(directory) {
                this.myFiles = false;
                this.directory = directory;
                this.$apollo.query({
                    query: directoryQuery,
                    variables: {
                        directoryKey: directory._key,
                    },
                }).then(({ data }) => {
                    const { files } = data.directory;
                    this.replaceFiles(files);
                });
            },
            selectedMyfiles() {
                this.$apollo.query({
                    query: meQuery,
                }).then(({ data }) => {
                    const { files } = data.me;
                    this.myFiles = true;
                    this.replaceFiles(files);
                });
            },
            replaceFiles(newFiles) {
                this.files.splice(0, this.files.length);
                newFiles.forEach((f) => {
                    // eslint-disable-next-line
                    f.selected = false;
                    this.files.push(f);
                });
            },
            removeFiles() {
                if (this.directory === null) return;
                Promise.all(this.selected.map(f => this.$apollo.mutate({
                    mutation: removeFileFromDirectoryQuery,
                    variables: { fileId: f._id, directoryId: this.directory._id },
                    update: (cache) => {
                        const { directory } = cache.readQuery({
                            query: directoryQuery,
                            variables: { directoryKey: this.directory._key },
                        });
                        const i1 = directory.files.indexOf(f);
                        if (i1 > -1) directory.files.splice(i1, 1);

                        const index = this.files.indexOf(f);
                        if (index > -1) this.files.splice(index, 1);
                    },
                }))).then(() => {
                    this.$toasted.info('Fichiers retirés');
                });
            },
        },
        data() {
            return {
                files: [],
                myFiles: false,
                directory: null,
            };
        },
    };
</script>
