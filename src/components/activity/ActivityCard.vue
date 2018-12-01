<template>
    <div>
        <div class="activity-card">
            <div class="card-header p-lg-5">
                <activity-poster />
            </div>
            <div class="card-content">
                <div class="pl-lg-5 pr-lg-5" v-if="hasText">
                    <slot name="text"/>
                </div>
                <slot/>
            </div>
            <div class="activity-likes pl-lg-5 pr-lg-5 pt-lg-3 pb-lg-3">
                <div class="d-lg-flex align-items-lg-center justify-content-lg-between">
                    <div class="users-likes d-flex align-items-lg-center pt-lg-3 pb-lg-3">
                        <div class="likes d-flex mr-lg-3">
                            <span style="background:#dd7169;"><icon icon="heart"/></span>
                            <span style="background:#007aff;"><icon icon="thumbs-up"/></span>
                        </div>
                        <p class="m-0">Bidule Chouette, Machin Chose et 12 personnes aiment ça</p>
                    </div>
                    <press-like-button />
                </div>
            </div>
            <div class="activity-comments">
                <comments/>
            </div>
        </div>
    </div>
</template>

<script>
    import pressLikeButton from '../Smart/PressLikeButton.vue';
    import activityPoster from './ActivityPoster.vue';
    import comments from './Comments.vue';

    export default {
        components: {
            pressLikeButton,
            activityPoster,
            comments,
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

    .activity-card {

        background:white;
        border:1px solid $gray-200;
        box-shadow:0 1px 2px rgba(0,0,0,0.03);
        border-radius:4px;

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
    }
</style>
