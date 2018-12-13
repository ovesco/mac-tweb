<template>
    <div>
        <div class="files-list">
            <el-table :data="files" style="width: 100%" @selection-change="selectFiles">
                <el-table-column width="55" type="selection">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.selected" />
                    </template>
                </el-table-column>
                <el-table-column label="Type" width="60">
                    <template slot-scope="scope">
                        <file-icon class="file-icon" :mime="scope.row.mimeType" />
                    </template>
                </el-table-column>
                <el-table-column label="Fichier" width="180">
                    <template slot-scope="scope">
                        {{ scope.row.filename|filename(25) }}
                    </template>
                </el-table-column>
                <el-table-column label="Auteur" width="180">
                    <template slot-scope="scope">
                        <smart-username :weight="400" :user="scope.row.user" />
                    </template>
                </el-table-column>
                <el-table-column label="Tags">
                    <template slot-scope="scope">
                        <div class="d-flex">
                            <file-tag v-for="tag in scope.row.tags" :key="tag"
                                      :tag="tag" class="mr-1" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Date">
                    <template slot-scope="scope">
                        {{ scope.row.date|moment('from') }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import FilesPropMixin from '../../mixins/FilesPropMixin';
    import FileSelectionMixin from '../../mixins/FileSelectionMixin';
    import FileContainerMixin from '../../mixins/FileContainerMixin';
    import FileIcon from './FileIcon.vue';

    export default {
        mixins: [
            FilesPropMixin,
            FileSelectionMixin,
            FileContainerMixin,
        ],
        components: {
            FileIcon,
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .files-list {

        .file-icon {
            color:$gray-500;
            font-size:1.2rem;
        }
    }
</style>
