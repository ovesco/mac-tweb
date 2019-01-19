<template>
    <div>
        <div class="container-lg pt-5">
            <div class="row no-gutters">
                <div class="col-lg-3 pr-lg-5">
                    <h2 class="text-black-50 pt-4 font-weight-normal">Rechercher des fichiers</h2>
                    <div class="search-form">
                        <div class="pb-3">
                            <el-input placeholder="Rechercher par nom" @input="updateFilename" />
                        </div>
                        <div class="pb-3">
                            <tags-chooser placeholder="Rechercher par tags"
                                          v-model="searchTags" />
                        </div>
                        <div>
                            <button class="btn btn-primary btn-block">
                                <icon icon="search" />
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9" v-if="searchFiles !== null">
                    <files-viewer @amount="updateAmount"
                                  v-loading="$apollo.loading"
                                  :files.sync="searchFiles.files"></files-viewer>
                    <el-pagination layout="pager" class="mt-2"
                                   :background="true"
                                   :current-page.sync="page"
                                   :page-size="filesPerPage"
                                   :total="searchFiles.amount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import filesViewer from '../components/files/FilesViewer.vue';
    import fileSelectionMixin from '../mixins/FileSelectionMixin';
    import TagsChooser from '../components/Smart/TagsChooser.vue';
    import { searchQuery } from '../graphql/FileQueries';

    export default {
        apollo: {
            searchFiles: {
                query: searchQuery,
                variables() {
                    return {
                        text: this.filename,
                        tags: this.searchTags,
                        amount: this.filesPerPage,
                        page: this.page,
                    };
                },
                update(data) {
                    data.searchFiles.files.forEach((f) => {
                        // eslint-disable-next-line
                        f.selected = false;
                    });
                    return data.searchFiles;
                },
            },
        },
        data() {
            return {
                searchFiles: null,
                searchTags: [],
                tagsOptions: [],
                filename: '',
                page: 1,
                filesPerPage: 8,
                filenameTimer: null,
            };
        },
        mixins: [
            fileSelectionMixin,
        ],
        components: {
            TagsChooser,
            filesViewer,
        },
        methods: {
            updateAmount(amount) {
                this.filesPerPage = amount;
            },
            updateFilename(newValue) {
                if (this.filenameTimer) clearTimeout(this.filenameTimer);
                this.filenameTimer = setTimeout(() => {
                    this.filename = newValue;
                }, 500);
            },
        },
    };
</script>
