<template>
    <div>
        <el-popover :open-delay="700"
                placement="top-start"
                width="300"
                trigger="click">
            <div>
                <div class="d-flex">
                    <div class="icon pr-4 pt-2">
                        <file-icon class="d-flex align-items-start" :mime="file.mimeType" />
                    </div>
                    <div>
                        <div class="filename">{{ file.filename }}</div>
                        <div class="meta">{{ file.date|moment('from') }} - {{ file.size }}</div>
                    </div>
                </div>
            </div>
            <a href="#" slot="reference" class="m-0" v-bind:style="style">{{ file.filename }}</a>
        </el-popover>
    </div>
</template>

<script>
    import FilePropMixin from '../../mixins/FilePropMixin';
    import SmartMixin from '../../mixins/SmartMixin';
    import FileIcon from '../files/FileIcon.vue';

    export default {
        mixins: [
            FilePropMixin,
            SmartMixin,
        ],
        components: {
            FileIcon,
        },
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .icon {
        font-size:3.5em;
        color: $gray-600;
    }

    .filename {
        color:black;
        font-weight:600;
        font-size:1rem;
    }

    .meta {
        font-size:0.8rem;
    }
</style>
