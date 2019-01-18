<template>
    <div>
        <div class="profile">
            <div class="container-lg">
                <div class="row">
                    <div class="col-lg-6">
                        <h2 class="text-black-50 pt-4 font-weight-normal">Mon activité</h2>
                        <apollo-query :query="require('../graphql/ActivityQueries')
                            .myActivitiesQuery">
                            <template slot-scope="{ result: { loading, error, data } }">
                                <div v-if="loading">Chargement de vos activités</div>
                                <div v-else-if="error">Erreur! {{ error }}</div>
                                <div v-else-if="data">
                                    <loaded-activity v-for="activity in data.myActivities"
                                        :key="activity._key" :activity="activity"
                                        class="mb-4" />
                                    <div v-if="data.myActivities.length === 0">
                                        Vous n'avez publié aucune activité pour l'instant.
                                    </div>
                                </div>
                                <div v-else></div>
                            </template>
                        </apollo-query>
                    </div>
                    <div class="col-lg-4">
                        <h2 class="text-black-50 pt-4 font-weight-normal">Profil</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loadedActivity from '../components/activity/LoadedActivity.vue';

export default {
    components: {
        loadedActivity,
    },
};
</script>

<style scoped lang="scss">
    .profile {
        .profile-header {
            width:100%;
            background:white;
        }
    }
</style>
