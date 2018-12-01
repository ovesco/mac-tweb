<template>
    <div>
        <div class="d-lg-flex user-info">
            <user-picture :size="5" :rounded="false" class="mr-lg-3 mt-lg-2" />
            <div class="flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                    <p class="m-0 username">Jean machin Bidule</p>
                    <p class="m-0 description">HEIG-VD</p>
                </div>

                <div class="d-flex justify-content-between stats">
                    <div class="d-flex align-items-center">
                        <icon icon="star" class="stats-icon mr-2"/>
                        <p class="m-0 stats-data text-black-50">232</p>
                    </div>

                    <div class="d-flex align-items-center">
                        <icon icon="heart" class="stats-icon mr-2"/>
                        <p class="m-0 stats-data text-black-50">232</p>
                    </div>

                    <div class="d-flex align-items-center">
                        <icon icon="thumbs-up" class="stats-icon mr-2"/>
                        <p class="m-0 stats-data text-black-50">232</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import userPicture from './UserPicture.vue';

    export default {
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
