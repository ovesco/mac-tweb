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
                        <files-viewer :files.sync="files">
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
    import fileSelectionMixin from '../mixins/FileSelectionMixin';

    export default {
        mixins: [fileSelectionMixin],
        components: {
            newDirectoryButton,
            filesViewer,
            directoryList,
        },
        data() {
            return {
                files: [
                    {
                        id: 0,
                        filename: 'yoloswag.pdf',
                        icon: 'file-pdf',
                        tags: ['swag', 'yolo'],
                        date: new Date(),
                        src: 'http://www.pdf995.com/samples/pdf.pdf',
                        author: 'jean michel',
                        selected: false,
                    },
                    {
                        id: 1,
                        filename: 'yoloswag.pdf',
                        icon: 'file-pdf',
                        tags: ['much', 'bimbim'],
                        src: 'http://www.africau.edu/images/default/sample.pdf',
                        date: new Date(),
                        author: 'jean michel',
                        selected: false,
                    },
                ],
            };
        },
    };
</script>
