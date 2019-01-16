<template>
    <div>
        <div class="activity-card">
            <div class="card-header d-flex justify-content-between p-lg-5">
                <activity-poster :activity="activity" />
                <div>
                    <el-popover placement="top" width="200" v-if="canRemove">
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
            <div class="activity-likes pl-lg-5 pr-lg-5 pt-lg-3 pb-lg-3" v-if="showLikes">
                <div class="d-lg-flex align-items-lg-center justify-content-lg-between">
                    <activity-like :likes="activity.likes" />
                    <press-like-button :item-id="activity._id" :likes="activity.likes" />
                </div>
            </div>
            <div class="activity-comments" v-if="showComments">
                <comments :comments="activity.comments" :itemId="activity._id" />
            </div>
        </div>
    </div>
</template>

<script>
    import pressLikeButton from '../Smart/PressLikeButton.vue';
    import activityPoster from './ActivityPoster.vue';
    import activityLike from '../like/LikesDisplayer.vue';
    import comments from '../comment/Comments.vue';
    import { feedQuery, deleteActivityQuery, myActivitiesQuery } from '../../graphql/ActivityQueries';

    export default {
        components: {
            pressLikeButton,
            activityLike,
            activityPoster,
            comments,
        },
        props: {
            activity: { type: Object, required: true },
            showLikes: { type: Boolean, default: () => true },
            showComments: { type: Boolean, default: () => true },
        },
        methods: {
            async deleteActivity() {
                await this.$apollo.mutate({
                    mutation: deleteActivityQuery,
                    variables: {
                        activityId: this.activity._id,
                    },
                    update: (cache) => {
                        try {
                            const { feed } = cache.readQuery({ query: feedQuery });
                            const index = feed.indexOf(this.activity);
                            if (index !== -1) feed.splice(index, 1);
                        } catch {
                            // do nothing
                        }
                        try {
                            const { myActivities } = cache.readQuery({ query: myActivitiesQuery });
                            const myIndex = myActivities.indexOf(this.activity);
                            if (myIndex !== -1) myActivities.splice(myIndex, 1);
                        } catch {
                            // do nothing
                        }
                    },
                });
            },
        },
        computed: {
            hasText() {
                return this.$slots.text !== undefined;
            },
            canRemove() {
                return this.activity.user._key === this.$store.state.security.userKey
                        && !this.$store.getters['ui/showModalActivity'];
            },
        },
    };
</script>

<style lang="scss" scoped>
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
    }
</style>
