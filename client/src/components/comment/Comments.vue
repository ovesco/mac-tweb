<template>
    <div>
        <div class="p-lg-5">
            <div class="pb-3" v-if="comments.length > 0">
                <comment class="mb-lg-4" v-for="comment in comments"
                         :key="comment._id" :comment="comment"/>
            </div>
            <div class="mt-lg-3" v-if="me !== null">
                <add-comment :item-id="itemId" :picture-key="me.pictureKey" />
            </div>
        </div>
    </div>
</template>

<script>
    import comment from './Comment.vue';
    import AddComment from './AddComment.vue';
    import { meQuery } from '../../graphql/UserQueries';

    export default {
        apollo: {
            me: {
                query: meQuery,
            },
        },
        components: {
            comment,
            AddComment,
        },
        data() {
            return {
                me: null,
            };
        },
        props: {
            user: {
                type: Object,
                required: true,
            },
            comments: {
                type: Array,
                default: () => [],
            },
            itemId: {
                type: String,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";
</style>
