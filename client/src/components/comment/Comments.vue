<template>
    <div>
        <div class="comments p-lg-5">
            <div class="comments-list pb-3" v-if="comments.length > 0">
                <comment class="mb-lg-4"/>
                <comment class=""/>
            </div>
            <div class="comment-rediger mt-lg-3" v-bind:class="{'border': comments.length > 0}">
                <add-comment />
            </div>
        </div>
    </div>
</template>

<script>
    import comment from './Comment.vue';
    import AddComment from './AddComment.vue';

    export default {
        components: {
            comment,
            AddComment,
        },
        props: {
            comments: {
                type: Array,
                default: () => [],
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .comments {

        .comment-rediger.border {
            border-top:1px solid $gray-200;
        }
    }
</style>
