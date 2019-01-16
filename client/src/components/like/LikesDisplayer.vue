<template>
    <div>
        <div class="d-flex align-items-lg-center pt-lg-3 pb-lg-3">
            <like-badges :likes="likes" />
            <p class="m-0" v-if="likes.length === 0">Soyez le premier à aimer</p>
            <p class="m-0" v-else-if="likes.length === 1">{{ likes[0].user.name }} aime ça</p>
            <p class="m-0" v-else-if="likes.length === 2">
                {{ likes[0].user.name }} et {{ likes[1].user.name }} aiment ça
            </p>
            <p class="m-0" v-else>
                {{ likes[0].user.name }}, {{ likes[1].user.name }}
                et {{likes.length - 2}} personnes aiment ça
            </p>
        </div>
    </div>
</template>

<script>
    import LikeMixin from '../../mixins/LikeMixin';
    import LikeBadges from './LikeBadges.vue';

    export default {
        mixins: [
            LikeMixin,
        ],
        components: {
            LikeBadges,
        },
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    p {
        font-size:0.8em;
        color:$gray-600;
    }
</style>
