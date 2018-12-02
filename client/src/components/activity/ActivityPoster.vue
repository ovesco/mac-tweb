<template>
    <div>
        <div class="user-details d-lg-flex align-items-lg-center">
            <user-picture class="mr-lg-3"/>
            <div class="user-details d-lg-flex flex-lg-column">
                <div class="username mb-lg-1 d-flex">
                    <smart-username />
                    <span class="text-black-50 mr-lg-1 ml-lg-1">a chargé 3 documents avec</span>
                    <smart-username :weight="400" />
                </div>
                <span class="text-black-50 post-date">25 Décembre 2018</span>
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
