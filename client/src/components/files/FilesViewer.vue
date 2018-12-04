<template>
    <div>
        <div class="files-viewer">
            <div class="d-flex justify-content-between mb-lg-5">
                <div class="d-flex">
                    <slot name="actions" />
                    <add-to-directory-button :files="selected" v-if="selected.length > 0"
                            class="mr-2" v-on:directory-selected="moveDirSelected" />
                    <read-files-button v-if="selected.length > 0 && selected.length < 4"
                           :files="selected" />
                </div>
                <div class="d-flex">
                    <el-select v-model="amount" placeholder="Select"
                               class="mr-lg-2" style="width:100px;">
                        <el-option
                                v-for="item in [20, 40, 60]"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                    <div class="btn-group">
                        <button class="btn btn-white"
                                :class="{'active': displayMode === GRID}"
                                @click="displayMode = GRID">
                            <i class="el-icon-menu"></i>
                        </button>
                        <button class="btn btn-white"
                                :class="{'active': displayMode === LIST}"
                                @click="displayMode = LIST">
                            <i class="el-icon-tickets"></i>
                        </button>
                    </div>
                </div>
            </div>

            <el-card shadow="never">
                <files-list v-if="displayMode === LIST" :files.sync="files" />
                <files-grid v-if="displayMode === GRID" :files.sync="files" :cols="4" />
            </el-card>
        </div>
    </div>
</template>

<script>
    import filesList from './FilesList.vue';
    import filesGrid from './FilesGrid.vue';
    import AddToDirectoryButton from './AddToDirectoryButton.vue';
    import readFilesButton from './ReadFilesButton.vue';
    import FilesPropMixin from '../../mixins/FilesPropMixin';

    const MODE = {
        GRID: 'grid',
        LIST: 'list',
    };

    export default {
        mixins: [
            FilesPropMixin,
        ],
        components: {
            AddToDirectoryButton,
            filesList,
            filesGrid,
            readFilesButton,
        },
        data() {
            return {
                displayMode: MODE.LIST,
                amount: 20,
                ...MODE,
            };
        },
        methods: {
            moveDirSelected(dir) {
                console.log(dir);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .btn-group {
        .btn {

            i {
                font-size: 1.2rem;
            }
        }
    }
</style>
