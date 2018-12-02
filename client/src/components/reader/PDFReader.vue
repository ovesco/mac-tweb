<template>
    <div>
        <div class="pdf-reader">
            <div class="reader-content" v-if="file">
                <iframe :src="file.src"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import FilePropMixin from '../../mixins/FilePropMixin';

    export default {
        mixins: [
            FilePropMixin,
        ],
    };
</script>

<style lang="scss" scoped>
    .reader-content {
        width:100%;
        height:100%;

        iframe {
            width:100% !important;
            border:none;
            height:100% !important;
        }
    }
</style>
