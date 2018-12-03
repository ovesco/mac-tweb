<template>
    <div>
        <el-popover
                placement="bottom"
                width="250">
            <div>
                <directory-list v-on:directory-selected="nextEmit" />
            </div>
            <button class="btn btn-white" slot="reference">
                <icon icon="copy" class="text-black-50 mr-1" />
                Ajouter {{ files.length }} fichiers à un dossier
            </button>
        </el-popover>
    </div>
</template>

<script>
    import directoryList from './DirectoryList.vue';
    import FilesPropMixin from '../../mixins/FilesPropMixin';

    export default {
        components: {
            directoryList,
        },
        mixins: [
            FilesPropMixin,
        ],
        methods: {
            nextEmit(args) {
                this.$emit('directory-selected', args);
            },
        },
    };
</script>
