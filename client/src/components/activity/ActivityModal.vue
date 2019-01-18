<template>
    <div>
        <div class="activity-modal" v-if="$store.getters['ui/showModalActivity']">
            <div class="dimmer d-flex justify-content-center align-items-center">
                <div class="content container-md" v-click-outside="closeModal">
                    <loaded-activity :activity="activity"
                        :show-comments="false" :show-likes="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loadedActivity from './LoadedActivity.vue';
import { activityFragment } from '../../graphql/ActivityQueries';

export default {
    components: {
        loadedActivity,
    },
    methods: {
        closeModal() {
            this.$store.commit('ui/setModalActivity', null);
        },
    },
    computed: {
        activity() {
            const id = this.$store.state.ui.modalActivityId;
            if (id === null) return null;
            return this.$apollo.provider.clients.defaultClient.cache.readFragment({
                fragmentName: 'activityFragment',
                fragment: activityFragment,
                id,
            });
        },
    },
};
</script>

<style scoped lang="scss">
    .activity-modal {
        position:fixed;
        top:0;
        left:0;
        width:100%;
        z-index:10;
        height:100%;
        padding-top:58px;

        .dimmer {
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.8);
        }
    }
</style>
