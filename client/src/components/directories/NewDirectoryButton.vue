<template>
    <div>
        <el-popover
                placement="bottom"
                width="250">
            <form class="d-flex" @submit="submit">
                <el-input placeholder="Nom du dossier" size="small" v-model="name"/>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary btn-small ml-2">Créer</button>
                </div>
            </form>
            <button class="btn btn-white" slot="reference">
                <icon icon="folder-plus" class="text-black-50 mr-1" />
                Nouveau dossier
            </button>
        </el-popover>
    </div>
</template>

<script>
    import { addDirectory as addQuery, getDirectories } from '../../graphql/DirectoryQueries';

    export default {
        data() {
            return {
                name: '',
            };
        },
        methods: {
            async submit($event) {
                $event.preventDefault();
                await this.$apollo.mutate({
                    mutation: addQuery,
                    variables: {
                        name: this.name,
                    },
                    update: (cache, { data: { addDirectory } }) => {
                        const { directories } = cache.readQuery({ query: getDirectories });
                        cache.writeQuery({
                            query: getDirectories,
                            data: { directories: directories.concat([addDirectory]) },
                        });
                    },
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    input {
        width:200px;
    }
</style>
