<template>
    <div>
        <files-viewer :files.sync="myFiles.files" @amount="changedAmount" />
        <el-pagination layout="pager" class="mt-2"
                       :background="true"
                       :current-page.sync="page"
                       :page-size="filesPerPage"
                       :total="myFiles.amount">
        </el-pagination>
    </div>
</template>

<script>
    import filesViewer from './FilesViewer.vue';
    import fileSelectionMixin from '../../mixins/FileSelectionMixin';
    import { myFilesQuery } from '../../graphql/FileQueries';

    export default {
        mixins: [fileSelectionMixin],
        components: {
            filesViewer,
        },
        apollo: {
            myFiles: {
                query: myFilesQuery,
                variables() {
                    return {
                        begin: this.currentPage,
                        amount: this.filesPerPage,
                    };
                },
                update(data) {
                    data.myFiles.files.forEach((f) => {
                        // eslint-disable-next-line
                        f.selected = false;
                    });
                    return data.myFiles;
                },
            },
        },
        methods: {
            changedAmount(value) {
                this.filesPerPage = value;
            },
        },
        data() {
            return {
                directoryFiles: [],
                myFiles: {
                    amount: 0,
                    files: [],
                },
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
