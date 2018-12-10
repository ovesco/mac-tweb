<template>
    <div>
        <div class="user-details d-lg-flex align-items-lg-center">
            <user-picture class="mr-lg-3"/>
            <div class="user-details d-lg-flex flex-lg-column">
                <div class="username mb-lg-1 d-flex">
                    <smart-username :user="activity.user" />
                    <span class="text-black-50 ml-2"
                          v-if="activity.files && activity.files.length > 0">
                        a chargé {{ activity.files.length }} document{{ s }}
                    </span>
                </div>
                <span class="text-black-50 post-date">{{ date | moment('from') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import userPicture from '../user/UserPicture.vue';
    import smartUsername from '../Smart/SmartUsername.vue';

    export default {
        components: {
            userPicture,
            smartUsername,
        },
        props: {
            activity: {
                type: Object,
                required: true,
            },
            date: {
                type: String || Date,
                default: () => new Date(),
            },
        },
        computed: {
            s() {
                return this.activity.files.length < 2 ? '' : 's';
            },
        },
    };
</script>

<style lang="scss">
    .user-details {

        .username {

            font-size:0.85em;
            .bold {
                font-weight:600;
            }
        }

        .post-date {
            font-size:0.7em;
        }
    }
</style>
