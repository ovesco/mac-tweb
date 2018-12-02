<template>
    <div>
        <div class="comments p-lg-5">
            <div class="comments-list">
                <comment class="mb-lg-4"/>
                <comment class=""/>
            </div>
            <div class="comment-rediger d-flex align-items-lg-start mt-lg-3 pt-lg-3">
                <div class="writer-picture mr-lg-3">
                    <user-picture :size="2.3" />
                </div>
                <div class="writer-comment flex-grow-1 pt-lg-3">
                    <form method="post">
                        <smart-input placeholder="Rédiger un commentaire" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import comment from './Comment.vue';
    import userPicture from '../user/UserPicture.vue';
    import smartInput from '../Smart/SmartInput.vue';

    export default {
        components: {
            smartInput,
            userPicture,
            comment,
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .comments {

        .comment-rediger {

            border-top:1px solid $gray-200;
        }
    }
</style>
