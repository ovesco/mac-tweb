<template>
    <div>
        <div class="files-viewer">
            <div class="d-flex justify-content-between mb-lg-5">
                <div class="d-flex">
                    <slot name="actions" />
                    <add-to-directory-button :files="selected" v-if="selected.length > 0"
                                             class="mr-2" v-on:directory-selected="check" />
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
                                :class="{'active': displayMode === 'list'}"
                                @click="displayMode = 'list'">
                            <i class="el-icon-tickets"></i>
                        </button>
                    </div>
                </div>
            </div>

            <el-card shadow="never">
                <list-files :selected.sync="selected" />
            </el-card>
        </div>
    </div>
</template>

<script>
    import listFiles from './FilesList.vue';
    import AddToDirectoryButton from './AddToDirectoryButton.vue';
    import readFilesButton from './ReadFilesButton.vue';

    export default {
        components: {
            AddToDirectoryButton,
            listFiles,
            readFilesButton,
        },
        props: {
            selected: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                displayMode: 'list',
                amount: 20,
            };
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
