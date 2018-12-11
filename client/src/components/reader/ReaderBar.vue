<template>
    <div class="height-standard">
        <div class="reader-bar d-flex justify-content-between align-items-center">
            <div class="pl-3">
                <smart-filename :file="file" size="0.9em" color="#444"
                                class="d-flex align-items-center" />
            </div>
            <div class="d-flex align-items-center">
                <p class="m-0 mt-1 mr-1">Uploadé par</p>
                <smart-username class="d-flex align-items-center mr-3" style="font-size:0.9em"
                                :user="file.user" />
                <el-tooltip effect="dark" placement="bottom"
                            :content="'Fermer ' + file.filename">
                    <a href="#" @click="close(file)">
                        <button class="btn btn-white">
                            <i class="el-icon-close"></i>
                        </button>
                    </a>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import FilePropMixin from '../../mixins/FilePropMixin';
    import SmartFilename from '../Smart/SmartFilename.vue';
    import SmartUsername from '../Smart/SmartUsername.vue';

    export default {
        mixins: [
            FilePropMixin,
        ],
        components: {
            SmartUsername,
            SmartFilename,
        },
        methods: {
            close(file) {
                this.$store.commit('ui/removeReaderFile', file);
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .reader-bar {
        background: $gray-200;
        width:100%;
        height:auto;

        p {
            font-size:0.8em;
            color:$gray-700;

            &.reader-title {
                font-weight:600;
            }
        }

        .btn {
            border-radius:0;
            border:none;
        }
    }
</style>
