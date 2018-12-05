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
    import addDirectoryQuery from '../../graphql/addDirectory.graphql';

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
                    mutation: addDirectoryQuery,
                    variables: {
                        name: this.name,
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
