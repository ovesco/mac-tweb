<template>
    <div>
        <div class="block-preview" :class="{'active': file.selected}">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <div>
                    <div class="icon d-flex justify-content-center mb-2">
                        <file-icon :mime="file.mimeType" />
                    </div>
                    <div class="file-metadata">
                        <smart-filename :file="file"
                            smart-style="position:relative;z-index:5;font-size:0.9em" />
                        <p class="metadata m-0 text-center">{{ file.date | moment('from') }}</p>
                        <p class="metadata m-0 text-center">{{ file.size | size }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FileBlockMixin from '../../../mixins/FileBlockMixin';
    import SmartFilename from '../../Smart/SmartFilename.vue';

    export default {
        mixins: [
            FileBlockMixin,
        ],
        components: {
            SmartFilename,
        },
    };
</script>

<style lang="scss">
    @import "../../../assets/scss/_variables.scss";

    .block-preview {

        width:100%;
        padding-top:100%;
        background:$gray-200;
        border-radius:5px;
        position:relative;
        overflow:hidden;

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
                transition:opacity .2s;
            }

            .icon {
                color:$gray-400;
                font-size:2em;
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
