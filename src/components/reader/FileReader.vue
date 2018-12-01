<template>
    <div>
        <div class="files-reader d-flex flex-column">
            <div class="reader-bar d-flex justify-content-between pl-3 pr-3 pt-2 pb-2">
                <div>
                    <p class="m-0 reader-title">Lecteur de fichiers</p>
                </div>
                <div>
                    <el-tooltip class="item" effect="dark" content="Fermer" placement="bottom">
                        <a href="#" @click="closeReader">
                            <i class="el-icon-close"></i>
                        </a>
                    </el-tooltip>
                </div>
            </div>
            <div class="reader-content">
                <div class="d-flex">
                    <div v-for="file in files" :key="file.id" class="reader-col">
                        <pdf-reader :src="file.src" />
                    </div>
                </div>
            </div>
            <div class="reader-bottom"></div>
        </div>
    </div>
</template>

<script>
    import pdfReader from './PDFReader.vue';

    export default {
        components: {
            pdfReader,
        },
        computed: {
            files() {
                return this.$store.state.reader.files;
            },
        },
        methods: {
            closeReader() {
                this.$store.commit('clearFilesToWatch');
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

            div {
                height: 100%;
            }

            .reader-col {
                width:100%;
                border-right:4px solid transparent;

                &:last-child {
                    border-right:none;
                }
            }
        }
    }
</style>
