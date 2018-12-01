<template>
    <div>
        <div class="document-preview" :class="{'active': file.selected}">
            <div class="d-flex flex-column justify-content-between align-items-center">
                <div>
                    <div class="select">
                        <el-checkbox v-model="file.selected">Sélectionner</el-checkbox>
                    </div>
                </div>
                <div>
                    <div class="icon d-flex justify-content-center mb-2">
                        <icon icon="file-pdf"/>
                    </div>
                    <div class="file-metadata">
                        <p class="filename m-0 text-center">{{ file.filename }}</p>
                        <p class="metadata m-0 text-center">{{ file.date }} - {{ file.size }}</p>
                    </div>
                </div>
                <div class="pb-2">
                    <div class="tags-container d-flex justify-content-center">
                        <file-tag v-for="tag in file.tags" :key="tag" :tag="tag"
                                  size="mini" class="mr-1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fileTag from '../files/FileTag.vue';

    export default {
        components: {
            fileTag,
        },
        props: {
            file: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss">
    @import "../../assets/scss/_variables.scss";

    .document-preview {
        width:100%;
        padding-top:100%;
        background:$gray-200;
        border:2px dashed $gray-300;
        border-radius:5px;
        position:relative;

        &:hover {

            .select, .tags-container {
                opacity:1;
            }
        }

        &.active {

            .select, .tags-container {
                opacity:1;
            }
        }

        > div {
            position:absolute;
            width:100%;
            height:100%;
            top:0;

            .select, .tags-container {
                opacity:0;
            }

            .icon {
                color:$gray-400;
                font-size:3em;
            }

            .file-metadata {

                .filename {
                    font-size:0.9em;
                }

                .metadata {
                    font-size:0.7em;
                    color:$gray-600;
                }
            }
        }
    }
</style>
