<template>
    <div>
        <div class="pdf-reader">
            <div class="reader-content" v-if="src">
                <iframe :src="src"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            src: {
                type: String,
                default: () => null,
            },
        },
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
