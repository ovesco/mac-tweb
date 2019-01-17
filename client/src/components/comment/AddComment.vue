<template>
    <div class="d-flex align-items-start">
        <div class="mr-lg-3">
            <user-picture :size="2.3" />
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
    import { createOrUpdateComment } from '../../graphql/CommentQueries';

    export default {
        props: {
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
                        update: () => {
                            this.comment = '';
                            this.showInput = true;
                        },
                    });
                }
            },
        },
    };
</script>
