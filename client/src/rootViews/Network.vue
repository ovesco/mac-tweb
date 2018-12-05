<template>
    <div>
        <s-header/>
        <div class="d-lg-flex n-body">
            <files-reader v-if="showReader" />
            <div class="main-content">
                <s-left-menu/>
                <div class="flex-lg-grow-1 n-content"
                     v-bind:class="{'menu-collapsed': menuCollapsed}">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Header from '../components/Header.vue';
    import LeftMenu from '../components/LeftMenu.vue';
    import filesReader from '../components/reader/FileReader.vue';

    export default {
        components: {
            filesReader,
            sHeader: Header,
            sLeftMenu: LeftMenu,
        },
        computed: {
            ...mapGetters({
                menuCollapsed: 'ui/menuCollapsed',
                showReader: 'ui/showReader',
            }),
        },
    };
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .main-content {
        width:100%;
    }

    .n-body {

        padding-top:57px;
        width:100%;
        min-height:100vh;
        height:100%;
        background: #f8fbfc;

        .n-content {

            padding-left: 250px;

            &.menu-collapsed {
                padding-left: 65px;
            }
        }
    }
</style>
