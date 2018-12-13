<template>
    <div>
        <div class="block-preview" :class="{'active': file.selected}">
            <div class="preview">
                <image-block :file="file" v-if="file.mimeType.startsWith('image')" />
                <default-block :file="file" v-else />
            </div>
            <div class="overlay d-flex flex-column justify-content-between"
                 :class="{'show-overlay': overlay}">
                <div class="select d-flex justify-content-center p-1">
                    <el-checkbox v-model="file.selected">Sélectionner</el-checkbox>
                </div>
                <div class="d-flex flex-column p-1">
                    <smart-filename v-if="overlay" :file="file" color="white"
                        smart-style="display:block;text-align:center;font-size:0.9em;color:white" />
                    <div class="tags-container d-flex justify-content-center" v-if="file.tags">
                        <file-tag v-for="tag in file.tags" :key="tag" :tag="tag"
                                  size="mini" class="mr-1" />
                    </div>
                    <div v-if="!file.tags || file.tags.length === 0"
                         class="notags text-center text-black-50">Aucun tags</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import imageBlock from './block/ImageBlock.vue';
    import defaultBlock from './block/DefaultBlock.vue';
    import FileBlockMixin from '../../mixins/FileBlockMixin';
    import SmartFilename from '../Smart/SmartFilename.vue';

    export default {
        mixins: [
            FileBlockMixin,
        ],
        components: {
            defaultBlock,
            imageBlock,
            SmartFilename,
        },
        computed: {
            overlay() {
                return this.file.mimeType.startsWith('image');
            },
        },
    };
</script>

<style lang="scss">
    @import "../../assets/scss/_variables.scss";

    .block-preview {

        width:100%;
        padding-top:100%;
        border-radius:5px;
        position:relative;
        overflow:hidden;

        .notags {
            font-size:0.7em;
        }

        .preview, .overlay {

            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
        }

        &:hover, &.active {
            .overlay {
                opacity:1;
            }
        }

        .overlay {

            opacity:0;
            transition:opacity .2s;

            p {

                font-size:0.9em;
            }

            &.show-overlay {

                p, .el-checkbox__label {
                    color:white;
                }

                > div:first-child {
                    background:linear-gradient(rgba(0,0,0,0.8), transparent);
                }

                > div:last-child {
                    background:linear-gradient(transparent, rgba(0,0,0,0.8));
                }
            }
        }
    }
</style>
