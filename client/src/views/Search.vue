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
                <div class="col-lg-9">
                    <apollo-query :query="require('../graphql/FileQueries').searchQuery"
                                  fetch-policy="no-cache"
                                  :variables="{ text: filename, tags: searchTags }">
                        <template slot-scope="{ result: { loading, error, data } }">
                            <files-viewer v-if="data && data.searchFiles.length > 0"
                                          :files.sync="data.searchFiles"></files-viewer>
                        </template>
                    </apollo-query>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import filesViewer from '../components/files/FilesViewer.vue';
    import fileSelectionMixin from '../mixins/FileSelectionMixin';
    import TagsChooser from '../components/Smart/TagsChooser.vue';

    export default {
        data() {
            return {
                searchTags: [],
                tagsOptions: [],
                filename: '',
                loading: false,
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
            updateFilename(newValue) {
                if (this.filenameTimer) clearTimeout(this.filenameTimer);
                this.filenameTimer = setTimeout(() => {
                    this.filename = newValue;
                }, 500);
            },
        },
    };
</script>
