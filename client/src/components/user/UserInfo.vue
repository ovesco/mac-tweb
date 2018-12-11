<template>
    <div>
        <apollo-query :query="require('../../graphql/UserQueries').userQuery"
                      :variables="{ userKey }">
            <template slot-scope="{ result: { liading, error, data } }">
                <div v-if="data">
                    <div class="d-lg-flex user-info">
                        <user-picture :size="5" :rounded="false" class="mr-lg-3 mt-lg-2" />
                        <div class="flex-grow-1 d-flex flex-column justify-content-between">
                            <div>
                                <p class="m-0 username">{{ data.user.name }}</p>
                                <p class="m-0 description">{{ data.user.email }}</p>
                            </div>

                            <div class="d-flex justify-content-between stats">
                                <div class="d-flex align-items-center">
                                    <icon icon="heart" class="stats-icon mr-2"/>
                                    <p class="m-0 stats-data text-black-50">
                                        {{ countLikes(data.user.reputation, 'SAVE') }}
                                    </p>
                                </div>

                                <div class="d-flex align-items-center">
                                    <icon icon="star" class="stats-icon mr-2"/>
                                    <p class="m-0 stats-data text-black-50">
                                        {{ countLikes(data.user.reputation, 'STAR') }}
                                    </p>
                                </div>

                                <div class="d-flex align-items-center">
                                    <icon icon="thumbs-up" class="stats-icon mr-2"/>
                                    <p class="m-0 stats-data text-black-50">
                                        {{ countLikes(data.user.reputation, 'LIKE') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </apollo-query>
    </div>
</template>

<script>
    import userPicture from './UserPicture.vue';

    export default {
        props: {
            userKey: {
                type: String,
                required: true,
            },
        },
        methods: {
            countLikes(reputation, type) {
                return reputation.filter(l => l.type === type).length;
            },
        },
        components: {
            userPicture,
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .user-info {

        .username {
            font-size:1rem;
            font-weight:600;
            color:black;
        }

        .description {
            font-size:0.8rem;
        }
        .stats {

            .stats-icon {
                font-size: 1rem;
                color:$gray-400;
            }
            .stats-data {
                font-size:0.8rem;
            }
        }
    }
</style>
