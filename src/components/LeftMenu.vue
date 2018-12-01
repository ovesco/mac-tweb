<template>
    <div>
        <div class="n-menu" v-bind:class="{'n-menu-large': !menuCollapsed}">
            <el-menu class="el-menu-vertical-demo" :collapse="menuCollapsed">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">Activité</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapsed: false,
            };
        },

        computed: {
            menuCollapsed() {
                return this.$store.state.menuCollapsed;
            },
        },
    };
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .n-menu {
        height:100vh;
        padding-top:57px;
        position:fixed;
        border-right:1.5px solid $gray-200;
        background:white;

        &.n-menu-large {
            width:250px;
        }

        ul {
            border-right:none;

            li {
                span {
                    font-size:0.9em;
                }
            }
        }
    }
</style>
