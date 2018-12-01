<template>
    <div>
        <div class="user-picture">
            <img src="../assets/images/face.jpeg" v-bind:style="{height: pSize, width: pSize}" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: String,
            },
            size: {
                type: Number,
                default: () => 3,
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
