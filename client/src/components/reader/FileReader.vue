<template>
    <div>
        <div class="files-reader d-flex flex-column">
            <div class="reader-content">
                <div class="d-flex">
                    <div v-for="file in files" :key="file.id" class="reader-col d-flex flex-column">
                        <reader-bar :file="file" />
                        <image-reader :file="file" v-if="file.mimeType.startsWith('image')" />
                        <pdf-reader :file="file" v-if="file.mimeType === 'application/pdf'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pdfReader from './PDFReader.vue';
    import ImageReader from './ImageReader.vue';
    import ReaderBar from './ReaderBar.vue';

    export default {
        components: {
            ImageReader,
            pdfReader,
            ReaderBar,
        },
        computed: {
            files() {
                return this.$store.state.ui.reader.files;
            },
        },
    };
</script>

<style lang="scss">
    @import "../../assets/scss/variables";

    .files-reader {

        position:fixed;
        padding-top:57px;
        z-index:2005;
        top:0;
        width:100%;
        height:100%;

        .reader-content {
            width:100%;
            position:relative;
            background: $gray-200;
            overflow:hidden;
            flex:1;

            div:not(.height-standard) {
                height: 100%;
            }

            .reader-col {
                width:100%;
                border-right:2px solid $gray-400;

                &:last-child {
                    border-right:none;
                }
            }
        }
    }
</style>
