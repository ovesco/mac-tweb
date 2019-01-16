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
                    <div class="col-lg-9" v-if="directory !== null">
                        <file-selecter :directory="directory" />
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
    import fileSelecter from '../components/files/FileSelecter.vue';

    export default {
        mixins: [fileSelectionMixin],
        components: {
            newDirectoryButton,
            fileSelecter,
            directoryList,
        },
        methods: {
            selectedDirectory(directory) {
                this.myFiles = false;
                this.directory = directory;
            },
            selectedMyFiles() {
                // o
            },
        },
        data() {
            return {
                myFiles: false,
                directory: null,
            };
        },
    };
</script>
