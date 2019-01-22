<template>
    <div>
        <transition name="notif">
            <div id="notifications-manager" v-click-outside="close"
                 v-if="$store.getters['ui/showNotifications']">
                <div class="content">
                    <div class="notifications">
                        <notification v-for="n in $store.state.ui.notifications"
                                      :key="n._key" :notification="n" />
                        <div v-if="!$store.getters['ui/notified']">
                            <div class="p-4 d-flex justify-content-center metas">
                                Aucune notification pour le moment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {
    NotifiedSubscription,
    lastNotificationsQuery,
    readNotificationsMutation,
} from '../../graphql/NotificationQueries';
import notification from './Notification.vue';

export default {
    components: { notification },
    mounted() {
        this.$apollo.query({
            query: lastNotificationsQuery,
        }).then(({ data }) => {
            data.lastNotifications.forEach((notif) => {
                this.$store.commit('ui/addNotification', notif);
            });
        });
    },
    methods: {
        close(e) {
            if (!e.target.classList.contains('notifications-manager')) {
                this.$apollo.mutate({
                    mutation: readNotificationsMutation,
                    variables: {
                        keys: this.$store.state.ui.notifications.map(n => n._key),
                    },
                }).then(() => {
                    this.$store.commit('ui/showNotifications', false);
                });
            }
        },
    },
    apollo: {
        $subscribe: {
            notified: {
                query: NotifiedSubscription,
                result({ data }) {
                    this.$store.commit('ui/addNotification', data.notified);
                },
            },
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .notif-enter-active, .notif-leave-active {
        transition: opacity .3s, transform .4s;
    }

    .notif-enter, .notif-leave-to {
        opacity: 0;
        transform: translateX(5em);
    }

    #notifications-manager {
        position:fixed;
        padding-top:53px;
        right:0;
        top:0;
        width:20em;
        height:100%;
        z-index:100;
        border-left: 1px solid $gray-200;
        box-shadow:0 0 10px rgba(0,0,0,0.05);

        .content {
            width:100%;
            height:100%;
            background:white;

            .notifications {
                width:100%;
                height:100%;
                overflow:auto;

                .metas {
                    font-size:0.8rem;
                    color:$gray-700;
                }
            }
        }
    }
</style>
