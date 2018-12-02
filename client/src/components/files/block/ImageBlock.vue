<template>
    <div style="width:100%;height:100%;">
        <div class="image-container">
            <img :src="file.src" />
        </div>
    </div>
</template>

<script>
    import FileBlockMixin from '../../../mixins/FileBlockMixin';

    export default {
        mixins: [
            FileBlockMixin,
        ],
    };
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/_variables.scss";

    .image-container {
        width:100%;
        height:100%;
    }
</style>
