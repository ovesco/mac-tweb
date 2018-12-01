<template>
    <div>
        <div class="files-list">
            <el-table :data="files" style="width: 100%" @selection-change="selectFiles">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                    label="Type"
                    width="60">
                    <template slot-scope="scope">
                        <icon class="mimetype-icon" :icon="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column
                        prop="filename"
                        label="Fichier"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="Auteur"
                        width="180">
                    <template slot-scope="scope">
                        <smart-username :weight="400" :text="scope.row.filename" />
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Tags">
                    <template slot-scope="scope">
                        <div class="d-flex">
                            <file-tag v-for="tag in scope.row.tags" :key="tag"
                                      :tag="tag" class="mr-1" />
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import smartUsername from '../Smart/SmartUsername.vue';
    import fileTag from './FileTag.vue';

    export default {
        components: {
            smartUsername,
            fileTag,
        },
        props: {
            selected: {
                type: Array,
                default: () => [],
            },
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
                    },
                    {
                        id: 1,
                        filename: 'yoloswag.pdf',
                        icon: 'file-pdf',
                        tags: ['much', 'bimbim'],
                        src: 'http://www.africau.edu/images/default/sample.pdf',
                        date: new Date(),
                        author: 'jean michel',
                    },
                ],
            };
        },
        methods: {
            selectFiles(val) {
                this.selected.splice(0);
                val.forEach((item) => {
                    this.selected.push(item);
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .files-list {

        .mimetype-icon {
            color:$gray-500;
            font-size:1.2rem;
        }
    }
</style>
