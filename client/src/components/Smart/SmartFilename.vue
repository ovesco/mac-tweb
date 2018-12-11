<template>
    <div>
        <el-popover :open-delay="700"
                placement="top-start"
                width="300"
                trigger="click">
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
                                        {{ data.file.date|moment('from') }} - {{ data.file.size }}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <like-button :likes="data.file.likes" :item-id="data.file._id" />
                                <like-badges :likes="data.file.likes" />
                            </div>
                        </div>
                        <div v-else>
                            no data
                        </div>
                    </template>
                </apollo-query>
            </div>
            <p class="m-0 f-title" slot="reference" :style="smartStyle">
                {{ file.filename | filename }}
            </p>
        </el-popover>
    </div>
</template>

<script>
    import FilePropMixin from '../../mixins/FilePropMixin';
    import SmartMixin from '../../mixins/SmartMixin';
    import LikeBadges from '../like/LikeBadges.vue';
    import LikeButton from './PressLikeButton.vue';
    import FileIcon from '../files/FileIcon.vue';

    export default {
        mixins: [
            FilePropMixin,
            SmartMixin,
        ],
        components: {
            FileIcon,
            LikeButton,
            LikeBadges,
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
