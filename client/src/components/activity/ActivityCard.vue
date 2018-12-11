<template>
    <div>
        <div class="activity-card">
            <div class="card-header p-lg-5">
                <activity-poster :activity="activity" />
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
                <comments :comments="activity.comments" />
            </div>
        </div>
    </div>
</template>

<script>
    import pressLikeButton from '../Smart/PressLikeButton.vue';
    import activityPoster from './ActivityPoster.vue';
    import activityLike from '../like/ActivityLike.vue';
    import comments from '../comment/Comments.vue';

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
        computed: {
            hasText() {
                return this.$slots.text !== undefined;
            },
        },
    };
</script>

<style lang="scss">
    @import "../../assets/scss/variables";

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
