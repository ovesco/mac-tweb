<template>
    <div>
        <div class="comment">
            <div class="d-flex align-items-lg-start">
                <user-picture :size="2.3" :picture-key="comment.user.pictureKey" class="mr-lg-3" />
                <div class="comment-content">
                    <p class="m-0 content d-flex">
                        <smart-username class="mr-2" :user="comment.user" />
                        <smart-input :value.sync="comment.content" v-if="updating"
                                     style="border:1px solid #eee" v-on:keydown="update" />
                        <span v-if="!updating">{{ comment.content }}</span>
                    </p>
                    <div class="comment-meta d-flex mt-lg-2">
                        <p class="m-0 text-black-50">{{ comment.date|moment('from') }}</p>
                        <p class="m-0 text-black-50 pl-2 update-comment"
                           v-if="comment.user._key === currentKey && !updating"
                           @click="updating = true">Modifier</p>
                        <p class="m-0 text-black-50 pl-2 update-comment"
                           v-if="comment.user._key === currentKey && updating"
                           @click="updating = false">Annuler</p>
                        <p class="m-0 text-black-50 pl-2 update-comment"
                           v-if="comment.user._key === currentKey"
                           @click="removeComment">Supprimer</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { createOrUpdateComment, deleteComment, activityCommentCache } from '../../graphql/CommentQueries';
    import userPicture from '../user/UserPicture.vue';
    import smartUsername from '../Smart/SmartUsername.vue';
    import SmartInput from '../Smart/SmartInput.vue';

    export default {
        components: {
            SmartInput,
            userPicture,
            smartUsername,
        },
        props: {
            comment: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                value: '',
                updating: false,
            };
        },
        methods: {
            async update(event) {
                if (event.code === 'Enter') {
                    this.$apollo.mutate({
                        mutation: createOrUpdateComment,
                        variables: {
                            content: this.comment.content,
                            commentKey: this.comment._key,
                        },
                    }).then(() => {
                        this.updating = false;
                    });
                }
            },
            async removeComment() {
                await this.$apollo.mutate({
                    mutation: deleteComment,
                    variables: { commentId: this.comment._id },
                    update: (cache) => {
                        const data = cache.readFragment({
                            id: this.comment._to,
                            fragmentName: 'searchCommentActivity',
                            fragment: activityCommentCache.read,
                        });
                        data.comments
                            .splice(data.comments.findIndex(c => c._id === this.comment._id), 1);
                        cache.writeFragment({
                            id: this.comment._to,
                            data,
                            fragmentName: 'updateCommentActivity',
                            fragment: activityCommentCache.write,
                        });
                    },
                });
            },
        },
        computed: {
            currentKey() {
                return this.$store.state.security.userKey;
            },
        },
    };
</script>

<style scoped lang="scss">
    .comment {
        p.content, p.username {
            line-height:1em;
            font-size:0.85em;

            &.username {
                font-weight:600;
            }
        }

        .comment-meta {

            font-size:0.7em;
        }

        .update-comment {
            cursor:pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
