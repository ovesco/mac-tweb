<template>
    <div>
        <s-header></s-header>
        <div class="d-lg-flex n-body">
            <s-left-menu></s-left-menu>
            <div class="flex-lg-grow-1 n-content" v-bind:class="{'menu-collapsed': menuCollapsed}">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import LeftMenu from './components/LeftMenu.vue';

    export default {
        components: {
            sHeader: Header,
            sLeftMenu: LeftMenu,
        },

        computed: {
            menuCollapsed() {
                return this.$store.state.menuCollapsed;
            },
        },
    };
</script>

<style lang="scss">
    @import "assets/scss/variables";

    .n-body {
        .n-content {

            box-sizing: border-box;
            padding-top:57px;
            padding-left: 250px;
            min-height:100vh;
            height:100%;
            background: $gray-100;

            &.menu-collapsed {
                padding-left: 65px;
            }
        }
    }
</style>
