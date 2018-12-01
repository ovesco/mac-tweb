<template>
    <div>
        <div class="document-preview">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="icon">
                    <icon icon="file-pdf"></icon>
                </div>
                <div class="file-metadata">
                    <p class="filename m-0 text-center">Mon super fichier.pdf</p>
                    <p class="metadata m-0 text-center">26 Janvier 2018 - 340Kb</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script></script>

<style lang="scss">
    @import "../../assets/scss/_variables.scss";

    .document-preview {
        width:100%;
        padding-top:100%;
        background:$gray-200;
        border:2px dashed $gray-300;
        border-radius:5px;
        position:relative;

        > div {
            position:absolute;
            width:100%;
            height:100%;
            top:0;

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
