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
                            <directory-list />
                        </el-card>
                    </div>
                    <div class="col-lg-9">
                        <files-viewer :selected.sync="selected">
                            <template slot="actions">
                                <button class="btn btn-white mr-2"
                                    v-if="selected.length > 0">
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
    import newDirectoryButton from '../components/files/NewDirectoryButton.vue';
    import directoryList from '../components/files/DirectoryList.vue';

    export default {
        components: {
            newDirectoryButton,
            filesViewer,
            directoryList,
        },
        data() {
            return {
                selected: [],
            };
        },
    };
</script>
