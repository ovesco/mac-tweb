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
                        <icon class="mimetype-icon" :icon="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column
                        prop="filename"
                        label="Fichier"
                        width="180">
                </el-table-column>
                <el-table-column label="Auteur" width="180">
                    <template slot-scope="scope">
                        <smart-username :weight="400" :text="scope.row.filename" />
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

    export default {
        mixins: [
            FilesPropMixin,
            FileSelectionMixin,
            FileContainerMixin,
        ],
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
