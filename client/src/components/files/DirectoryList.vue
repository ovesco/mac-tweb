<template>
    <div>
        <div class="directory-list">
            <el-menu>
                <el-menu-item v-for="item in menu" :key="item.id" :index="item.id"
                              @click="$emit('directory-selected', item)">
                    <span>{{ item.title }}</span>
                </el-menu-item>
            </el-menu>
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
