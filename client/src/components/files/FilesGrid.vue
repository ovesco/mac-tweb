<template>
    <div>
        <div class="files-grid">
            <div class="row no-gutters pb-1">
                <div class="file-col col-6 col-sm-4 pt-3 pb-2 pl-3 pr-2"
                     v-for="file in files" :key="file.id" :class="[colClass]">
                    <file-block :file.sync="file" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FilesPropMixin from '../../mixins/FilesPropMixin';
    import FileContainerMixin from '../../mixins/FileContainerMixin';
    import fileBlock from './FileBlock.vue';

    export default {
        components: {
            fileBlock,
        },
        mixins: [
            FilesPropMixin,
            FileContainerMixin,
        ],
        props: {
            cols: {
                type: Number,
                default: () => 3,
            },
        },
        computed: {
            colClass() {
                return `col-lg-${Math.floor(12 / this.cols)}`;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";
</style>
