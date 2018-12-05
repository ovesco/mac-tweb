<template>
    <div>
        <div v-if="selected.length > 0" class="p-lg-2 d-flex">
            <add-to-directory-button :files="selected" class="mr-2" />
            <read-files-button :files="selected" v-if="selected.length < 4" />
        </div>
        <div class="row no-gutters">
            <div class="col-6 col-sm-4 p-lg-2" v-for="(file, k) in files.slice(0, show)" :key="k">
                <file-block :file="file" />
            </div>
        </div>
    </div>
</template>

<script>
    import fileBlock from '../files/FileBlock.vue';
    import addToDirectoryButton from '../directories/AddToDirectoryButton.vue';
    import readFilesButton from '../files/ReadFilesButton.vue';
    import FilesPropMixin from '../../mixins/FilesPropMixin';

    export default {
        components: {
            fileBlock,
            addToDirectoryButton,
            readFilesButton,
        },
        props: {
            show: {
                type: Number,
                default: () => 10000,
            },
        },
        mixins: [
            FilesPropMixin,
        ],
    };
</script>
