<template>
    <div>
        <div class="container-md pt-lg-5" v-infinite-scroll="showMore">
            <div class="mb-5" v-if="me !== null">
                <div>
                    <p class="m-0 font-size-9 text-muted">Les tags auxquels vous êtes abonné</p>
                    <tags-chooser @input="newTagsSelected" v-model="me.followingTags" />
                </div>
            </div>
            <div class="mb-5">
                <add-activity />
            </div>
            <div v-loading="loading || $apollo.loading">
                <loaded-activity v-for="activity in feed"
                                 :activity="activity" :key="activity._key"
                                 class="mb-4 "/>
            </div>
        </div>
    </div>
</template>

<script>
import addActivity from '../components/activity/AddActivity.vue';
import loadedActivity from '../components/activity/LoadedActivity.vue';
import tagsChooser from '../components/Smart/TagsChooser.vue';
import { feedQuery } from '../graphql/ActivityQueries';
import { updateMeMutation, meQuery } from '../graphql/UserQueries';

export default {
    apollo: {
        feed: {
            query: feedQuery,
            variables: {
                page: 0,
            },
        },
        me: {
            query: meQuery,
        },
    },
    methods: {
        newTagsSelected(followingTags) {
            this.loading = true;
            this.$apollo.mutate({
                mutation: updateMeMutation,
                variables: { data: { followingTags } },
            }).then(() => {
                this.loading = false;
                this.$apollo.queries.feed.refresh();
            });
        },
        showMore() {
            this.loading = true;
            this.page += 1;
            this.$apollo.queries.feed.fetchMore({
                variables: {
                    page: this.page,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    this.loading = false;
                    return {
                        feed: [...previousResult.feed, ...fetchMoreResult.feed],
                    };
                },
            });
        },
    },
    components: {
        addActivity,
        loadedActivity,
        tagsChooser,
    },
    data() {
        return {
            page: 0,
            loading: true,
            me: null,
            feed: [],
        };
    },
};
</script>
