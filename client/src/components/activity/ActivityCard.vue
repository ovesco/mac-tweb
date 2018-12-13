<template>
    <div>
        <div class="activity-card">
            <div class="card-header d-flex justify-content-between p-lg-5">
                <activity-poster :activity="activity" />
                <div>
                    <el-popover placement="top" width="200">
                        <p class="delete-text" style="text-align:left;">
                            Voulez-vous supprimer cette activité? Les fichiers resteront
                            en ligne, ils devront être supprimés depuis votre bibliothèque
                        </p>
                        <div style="text-align: right; margin: 0">
                            <el-button type="primary" size="mini" @click="deleteActivity">
                                Just do it!
                            </el-button>
                        </div>
                        <div class="remove" slot="reference">
                            <icon icon="times" />
                        </div>
                    </el-popover>
                </div>
            </div>
            <div class="card-content">
                <div class="pl-lg-5 pr-lg-5" v-if="hasText">
                    <slot name="text"/>
                </div>
                <slot/>
            </div>
            <div class="activity-likes pl-lg-5 pr-lg-5 pt-lg-3 pb-lg-3">
                <div class="d-lg-flex align-items-lg-center justify-content-lg-between">
                    <activity-like :likes="activity.likes" />
                    <press-like-button :item-id="activity._id" :likes="activity.likes" />
                </div>
            </div>
            <div class="activity-comments">
                <comments :comments="activity.comments" :itemId="activity._id" />
            </div>
        </div>
    </div>
</template>

<script>
    import pressLikeButton from '../Smart/PressLikeButton.vue';
    import activityPoster from './ActivityPoster.vue';
    import activityLike from '../like/ActivityLike.vue';
    import comments from '../comment/Comments.vue';
    import { feedQuery, deleteActivityQuery } from '../../graphql/ActivityQueries';

    export default {
        components: {
            pressLikeButton,
            activityLike,
            activityPoster,
            comments,
        },
        props: {
            activity: {
                type: Object,
                required: true,
            },
        },
        methods: {
            async deleteActivity() {
                await this.$apollo.mutate({
                    mutation: deleteActivityQuery,
                    variables: {
                        activityId: this.activity._id,
                    },
                    update: (cache) => {
                        const { feed } = cache.readQuery({ query: feedQuery });
                        const index = feed.indexOf(this.activity);
                        if (index !== -1) feed.splice(index, 1);
                    },
                });
            },
        },
        computed: {
            hasText() {
                return this.$slots.text !== undefined;
            },
        },
    };
</script>

<style lang="scss">
    @import "../../assets/scss/variables";

    .remove {

        cursor:pointer;
        color: $gray-400;

        &:hover {
            color: $gray-500;
        }
    }

    .delete-text {
        font-size:0.85em;
    }

    .activity-likes {
        border-top:1px solid $gray-200;
        border-bottom:1px solid $gray-200;

        p {
            font-size:0.8em;
            color:$gray-600;
        }

        .likes {

            span {
                font-size:0.5em;
                color:white;
                width:2em;
                height:2em;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:100%;

                &:not(:first-child) {
                    margin-left:-0.7em;
                }
            }
        }
    }
</style>
