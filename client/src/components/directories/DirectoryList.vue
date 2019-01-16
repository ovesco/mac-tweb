<template>
    <div>
        <div class="directory-list">
            <ApolloQuery :query="require('../../graphql/DirectoryQueries.js').directoriesQuery">
                <template slot-scope="{ result: { loading, error, data }}">
                    <div v-if="loading">Loading</div>
                    <div v-else-if="error">Erreur mamene</div>
                    <div v-else-if="data">
                        <el-menu v-if="data.directories.length > 0 || showMines">
                            <el-menu-item v-for="item in data.directories"
                                          :key="item._key" :index="item._key"
                                          @click="$emit('directory-selected', item)">
                                <span>{{ item.name }}</span>
                            </el-menu-item>
                            <el-menu-item v-if="showMines" index="my-files"
                                          @click="$emit('myfiles-selected')">
                                <span>Mes fichiers</span>
                            </el-menu-item>
                        </el-menu>
                        <p v-else class="m-0 text-center">
                            Aucun dossier actuellement, créez-en un!
                        </p>
                    </div>
                    <div v-else>no result</div>
                </template>
            </ApolloQuery>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            selected: {
                type: String,
                default: () => null,
            },
            showMines: {
                type: Boolean,
                default: () => false,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .el-menu-item {
        height:40px;
        line-height:35px;
    }

    p {
        font-size:0.75rem;
    }
</style>
