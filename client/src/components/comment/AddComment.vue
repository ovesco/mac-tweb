<template>
    <div class="d-flex align-items-start">
        <div class="mr-lg-3">
            <user-picture :picture-key="pictureKey" :size="2.3" />
        </div>
        <div class="flex-grow-1 pt-lg-3">
            <form method="post">
                <smart-input placeholder="Rédiger un commentaire" v-if="showInput"
                             :value.sync="comment" v-on:keydown="check" />
            </form>
        </div>
    </div>
</template>

<script>
    import userPicture from '../user/UserPicture.vue';
    import smartInput from '../Smart/SmartInput.vue';
    import FeedMixin from '../../mixins/FeedMixin';
    import { activityCommentCache, createOrUpdateComment } from '../../graphql/CommentQueries';

    export default {
        props: {
            pictureKey: {
                type: String,
            },
            itemId: {
                type: String,
                required: true,
            },
        },
        components: {
            smartInput,
            userPicture,
        },
        data() {
            return {
                comment: '',
                showInput: true,
            };
        },
        mixins: [
            FeedMixin,
        ],
        methods: {
            async check(event) {
                if (event.code === 'Enter') { // do the shit m8
                    this.showInput = false;
                    await this.$apollo.mutate({
                        mutation: createOrUpdateComment,
                        variables: {
                            content: this.comment,
                            itemId: this.itemId,
                        },
                        update: (cache, { data }) => {
                            const comment = data.createOrUpdateComment;
                            this.comment = '';
                            this.showInput = true;
                            const activity = cache.readFragment({
                                fragment: activityCommentCache.read,
                                fragmentName: 'searchCommentActivity',
                                id: comment._to,
                            });
                            activity.comments.push(comment);
                            cache.writeFragment({
                                fragment: activityCommentCache.write,
                                fragmentName: 'updateCommentActivity',
                                id: comment._to,
                                data: activity,
                            });
                        },
                    });
                }
            },
        },
    };
</script>
