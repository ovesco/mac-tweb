<template>
    <div>
        <div class="notification">
            <div class="p-3">
                <div class="d-flex font-size-9">
                    <smart-username :user="notification.performer" />
                    <span class="ml-1 mr-1">a</span>
                    <span v-if="notification.type === 'like'">liké</span>
                    <span v-else>commenté</span>
                    <div class="ml-1">
                        <smart-filename v-if="notification.target.filename"
                                        :file="notification.target" />
                        <div v-else
                             @click="$store.commit('ui/setModalActivity', notification.target)">
                            votre activité
                        </div>
                    </div>
                </div>
                <div class="d-flex font-size-8">
                    <span>{{ notification.date|moment('from') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmartUsername from '../Smart/SmartUsername.vue';
import SmartFilename from '../Smart/SmartFilename.vue';

export default {
    props: ['notification'],
    components: {
        SmartUsername,
        SmartFilename,
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .notification {
        border-bottom:1px solid $gray-200;

        .metas {
            font-size:0.8rem;
            color:$gray-600;
        }
    }
</style>
