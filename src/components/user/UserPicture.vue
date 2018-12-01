<template>
    <div>
        <div class="user-picture">
            <img src="../../assets/images/face.jpeg" v-bind:style="{height: pSize, width: pSize}"
            :class="{'rounded': !rounded}"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: String,
            },
            rounded: {
                type: Boolean,
                default: true,
            },
            size: {
                type: Number,
                default: 3,
            },
        },
        computed: {
            pSize() {
                return `${this.size}em`;
            },
        },
    };
</script>

<style lang="scss">
    .user-picture {
        img {
            border-radius:100px;
        }
    }
</style>
