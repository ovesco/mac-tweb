<template>
    <div>
        <el-popover :open-delay="700"
                placement="top-start"
                width="300"
                trigger="hover">
            <div>
                <apollo-query :query="require('../../graphql/FileQueries').fileQuery"
                              :variables="{ fileKey: file._key }">
                    <template slot-scope="{ result: { loading, error, data } }">
                        <div v-if="loading">Loading</div>
                        <div v-else-if="error">Erreur {{error}}</div>
                        <div v-else-if="data">
                            <div class="d-flex">
                                <div class="icon pr-4 pt-2">
                                    <file-icon class="d-flex align-items-start"
                                               :mime="data.file.mimeType" />
                                </div>
                                <div>
                                    <div class="filename">{{ data.file.filename | filename }}</div>
                                    <div class="meta">
                                        {{ data.file.date|moment('from') }} -
                                        {{ data.file.size|size }}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-2">
                                <like-displayer :likes="data.file.likes" />
                                <like-button :likes="data.file.likes" :item-id="data.file._id" />
                            </div>
                        </div>
                        <div v-else>
                            no data
                        </div>
                    </template>
                </apollo-query>
            </div>
            <p class="m-0 f-title" slot="reference" :style="smartStyle" @click="openFile">
                {{ file.filename | filename(this.nameSize) }}
            </p>
        </el-popover>
    </div>
</template>

<script>
    import FilePropMixin from '../../mixins/FilePropMixin';
    import SmartMixin from '../../mixins/SmartMixin';
    import LikeButton from './PressLikeButton.vue';
    import FileIcon from '../files/FileIcon.vue';
    import LikeDisplayer from '../like/LikesDisplayer.vue';

    export default {
        mixins: [
            FilePropMixin,
            SmartMixin,
        ],
        components: {
            FileIcon,
            LikeButton,
            LikeDisplayer,
        },
        props: {
            nameSize: {
                type: Number,
                default: () => 30,
            },
        },
        methods: {
            openFile() {
                this.$store.commit('ui/addFileToWatch', this.file);
            },
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

    .f-title {
        cursor:pointer;

        &:hover{
            text-decoration: underline;
        }
    }

    .meta {
        font-size:0.8rem;
    }
</style>
