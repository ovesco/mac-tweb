<template>
    <div>
        <div class="likes d-flex mr-lg-3" v-if="likes.length > 0">
            <span style="background:#dd7169;" v-if="isType('SAVE')"><icon icon="heart"/></span>
            <span style="background:#1ead6d;" v-if="isType('STAR')"><icon icon="star"/></span>
            <span style="background:#007aff;" v-if="isType('LIKE')"><icon icon="thumbs-up"/></span>
        </div>
    </div>
</template>

<script>
    import LikeMixin from '../../mixins/LikeMixin';

    export default {
        mixins: [LikeMixin],
        methods: {
            isType(type) {
                return this.likes.filter(l => l.type === type).length > 0;
            },
        },
    };
</script>

<style scoped lang="scss">
    .likes {

        span {
            font-size:0.5em;
            color:white;
            width:2em;
            height:2em;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:100%;

            &:not(:first-child) {
                margin-left:-0.7em;
            }
        }
    }
</style>
