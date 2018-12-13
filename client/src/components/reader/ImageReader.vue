<template>
    <div>
        <div class="image-reader" v-if="file">
            <div class="image-content d-flex flex-column align-items-center justify-content-center">
                <img :src="fileSrc" />
                <p class="m-0 image-meta text-white-50">
                    {{ file.date|moment('from') }} - {{ file.size|size }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import FileMixin from '../../mixins/FilePropMixin';

    export default {
        mixins: [
            FileMixin,
        ],
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .image-reader {

        width:100%;
        height:100%;
        background:$gray-800;

        .image-content {

            width:100%;
            height:100%;

            img {
                max-width:80%;
                max-height:80%;
                box-shadow: 0 3px 15px rgba(0,0,0,0.2);
            }

            .image-meta {
                font-size:0.9em;
            }
        }
    }
</style>
