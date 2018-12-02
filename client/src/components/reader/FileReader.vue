<template>
    <div>
        <div class="files-reader d-flex flex-column">
            <div class="reader-content">
                <div class="d-flex">
                    <div v-for="file in files" :key="file.id" class="reader-col d-flex flex-column">

                        <div class="reader-bar height-standard
                        d-flex justify-content-between pl-3 pr-3 pt-2 pb-2">
                            <div>
                                <p class="m-0 reader-title">{{ file.filename }}</p>
                            </div>
                            <div>
                                <el-tooltip class="item" effect="dark" placement="bottom"
                                    :content="'Fermer ' + file.filename">
                                    <a href="#" @click="close(file)">
                                        <i class="el-icon-close"></i>
                                    </a>
                                </el-tooltip>
                            </div>
                        </div>

                        <image-reader :file="file" v-if="file.mimeType.startsWith('image')" />
                        <pdf-reader :file="file" v-if="file.mimeType === 'application/pdf'" />
                    </div>
                </div>
            </div>
            <div class="reader-bottom"></div>
        </div>
    </div>
</template>

<script>
    import pdfReader from './PDFReader.vue';
    import ImageReader from './ImageReader.vue';

    export default {
        components: {
            ImageReader,
            pdfReader,
        },
        computed: {
            files() {
                return this.$store.state.reader.files;
            },
        },
        methods: {
            close(file) {
                this.$store.commit('removeReaderFile', file);
            },
        },
    };
</script>

<style lang="scss">
    @import "../../assets/scss/variables";

    .files-reader {

        position:absolute;
        padding-top:57px;
        z-index:20;
        top:0;
        width:100%;
        height:100%;

        .reader-bar {
            background: $gray-200;
        }

        .reader-title {
            font-size:0.9em;
        }

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
