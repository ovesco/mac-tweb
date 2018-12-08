<template>
    <div>
        <div class="directory-list">
            <ApolloQuery :query="require('../../graphql/DirectoryQueries.js').getDirectories">
                <template slot-scope="{ result: { loading, error, data }}">
                    <div v-if="loading">Loading</div>
                    <div v-else-if="error">Erreur mamene</div>
                    <div v-else-if="data">
                        <el-menu>
                            <el-menu-item v-for="item in data.directories"
                                          :key="item._key" :index="item._key"
                                          @click="$emit('directory-selected', item)">
                                <span>{{ item.name }}</span>
                            </el-menu-item>
                        </el-menu>
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
        },
        data() {
            return {
                menu: [
                    {
                        id: '1',
                        title: 'Des fichiers à moi',
                    },
                    {
                        id: '2',
                        title: 'D\'autres fichiers',
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    .el-menu-item {
        height:40px;
        line-height:35px;
    }
</style>
