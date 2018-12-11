<template>
    <div class="d-flex align-items-start">
        <div class="writer-picture mr-lg-3">
            <user-picture :size="2.3" />
        </div>
        <div class="writer-comment flex-grow-1 pt-lg-3">
            <form method="post">
                <smart-input placeholder="Rédiger un commentaire" v-on:change="check" />
            </form>
        </div>
    </div>
</template>

<script>
    import userPicture from '../user/UserPicture.vue';
    import smartInput from '../Smart/SmartInput.vue';
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
        methods: {
            async check(content, event) {
                if (event.code === 'Enter') { // do the shit m8
                    await this.$apollo.mutate({
                        mutation: createOrUpdateComment,
                        variables: {
                            content,
                            itemId: this.itemId,
                        },
                    });
                }
            },
        },
    };
</script>
