<template>
    <div>
        <div class="container-md pt-lg-5">
            <div class="mb-5"><add-activity /></div>
            <apollo-query :query="require('../graphql/ActivityQueries').feedQuery"
                          fetch-policy="no-cache">
                <template slot-scope="{ result: { loading, error, data } }">
                    <div v-if="loading">Chargement</div>
                    <div v-else-if="error">Erreur! {{ error }}</div>
                    <div v-else-if="data">
                        <card-activity v-for="activity in data.feed" class="mb-5"
                                        :activity="activity" :key="activity._key">
                            <div slot="text" v-if="activity.content"
                                 v-html="activity.content"></div>
                            <activity-files :files="activity.files"
                                            class="pl-lg-3 pr-lg-3 pt-lg-5 pb-lg-5"
                                            v-if="activity.files && activity.files.length > 0" />
                        </card-activity>
                    </div>
                    <div v-else>No result</div>
                </template>
            </apollo-query>
        </div>
    </div>
</template>

<script>
    import addActivity from '../components/activity/AddActivity.vue';
    import cardActivity from '../components/activity/ActivityCard.vue';
    import activityFiles from '../components/activity/ActivityFiles.vue';
    import DummyFiles from '../assets/DummyFiles';

    export default {
        components: {
            addActivity,
            cardActivity,
            activityFiles,
        },
        data() {
            return {
                files: DummyFiles,
            };
        },
    };
</script>
