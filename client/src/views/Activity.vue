<template>
    <div>
        <div class="container-md pt-lg-5" v-infinite-scroll="showMore">
            <div class="mb-5">
                <add-activity />
            </div>
            <loaded-activity v-for="activity in feed"
                             :activity="activity" :key="activity._key"
                             class="mb-4 "/>
        </div>
    </div>
</template>

<script>
import addActivity from '../components/activity/AddActivity.vue';
import loadedActivity from '../components/activity/LoadedActivity.vue';
import { feedQuery } from '../graphql/ActivityQueries';

export default {
    apollo: {
        feed: {
            query: feedQuery,
            variables: {
                page: 0,
            },
        },
    },
    watch: {
        bottom(bottom) {
            if (bottom) this.showMore();
        },
    },
    methods: {
        bottomVisible() {
            const { scrollY } = window;
            const visible = document.documentElement.clientHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOfPage = visible + scrollY >= pageHeight;
            return bottomOfPage || pageHeight < visible;
        },
        showMore() {
            this.page += 1;
            this.$apollo.queries.feed.fetchMore({
                variables: {
                    page: this.page,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    console.log(previousResult, fetchMoreResult);
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
    },
    data() {
        return {
            page: 0,
            bottom: false,
            feed: [],
        };
    },
};
</script>
