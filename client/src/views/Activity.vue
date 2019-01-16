<template>
    <div>
        <div class="container-md pt-lg-5">
            <div class="mb-5">
                <add-activity />
            </div>
            <apollo-query :query="require('../graphql/ActivityQueries').feedQuery">
                <template slot-scope="{ result: { loading, error, data } }">
                    <div v-if="loading">Chargement</div>
                    <div v-else-if="error">Erreur! {{ error }}</div>
                    <div v-else-if="data">
                        <loaded-activity v-for="activity in data.feed"
                                         :activity="activity" :key="activity._key"
                                         class="mb-4 "/>
                        <div v-if="data.feed.length === 0">
                            Rien à afficher pour l'instant
                        </div>
                    </div>
                    <div v-else></div>
                </template>
            </apollo-query>
        </div>
    </div>
</template>

<script>
    import addActivity from '../components/activity/AddActivity.vue';
    import loadedActivity from '../components/activity/LoadedActivity.vue';
    import DummyFiles from '../assets/DummyFiles';

    export default {
        components: {
            addActivity,
            loadedActivity,
        },
        data() {
            return {
                files: DummyFiles,
            };
        },
    };
</script>
