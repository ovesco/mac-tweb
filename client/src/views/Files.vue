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
                                            v-on:myfiles-selected="selectedMyFiles" />
                        </el-card>
                    </div>
                    <div class="col-lg-9" v-if="directory !== null && !ownDirectory">
                        <directory-files :directory="directory" />
                    </div>
                    <div class="col-lg-9" v-if="ownDirectory">
                        <own-files />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import newDirectoryButton from '../components/directories/NewDirectoryButton.vue';
    import directoryList from '../components/directories/DirectoryList.vue';
    import fileSelectionMixin from '../mixins/FileSelectionMixin';
    import directoryFiles from '../components/files/DirectoryFiles.vue';
    import ownFiles from '../components/files/OwnFiles.vue';

    export default {
        mixins: [fileSelectionMixin],
        components: {
            newDirectoryButton,
            directoryFiles,
            directoryList,
            ownFiles,
        },
        methods: {
            selectedDirectory(directory) {
                this.ownDirectory = false;
                this.directory = directory;
            },
            selectedMyFiles() {
                this.ownDirectory = true;
            },
        },
        data() {
            return {
                ownDirectory: false,
                directory: null,
            };
        },
    };
</script>
