<template>
    <div>
        <div class="n-menu" v-bind:class="{'n-menu-large': !menuCollapsed}">
            <div class="d-flex flex-column justify-content-between">
                <el-menu :collapse="menuCollapsed" :router="true">
                    <el-menu-item index="activity" class="d-flex">
                        <div class="icon" v-bind:class="{'collapsed': menuCollapsed}">
                            <icon icon="comment-alt" />
                        </div>
                        <span slot="title">Activité</span>
                    </el-menu-item>
                    <el-menu-item index="profile" class="d-flex">
                        <div class="icon" v-bind:class="{'collapsed': menuCollapsed}">
                            <icon icon="user" />
                        </div>
                        <span slot="title">Profil</span>
                    </el-menu-item>
                    <el-menu-item index="files" class="d-flex">
                        <div class="icon" v-bind:class="{'collapsed': menuCollapsed}">
                            <icon icon="folder-open" />
                        </div>
                        <span slot="title">Bibliothèque</span>
                    </el-menu-item>
                </el-menu>

                <el-menu :collapse="menuCollapsed">
                    <el-menu-item index="collapse" class="d-flex" @click="toggle">
                        <div class="icon" v-bind:class="{'collapsed': menuCollapsed}">
                            <icon icon="sign-out-alt" v-if="menuCollapsed" />
                            <icon icon="sign-in-alt" v-else />
                        </div>
                        <span slot="title" v-if="menuCollapsed">Agrandir</span>
                        <span slot="title" v-else>Réduire</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            menuCollapsed() {
                return this.$store.state.menuCollapsed;
            },
        },
        methods: {
            toggle() {
                this.$store.commit('collapseMenu', !this.menuCollapsed);
            },
        },
    };
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .n-menu {
        height:calc(100% - 57px);
        position:fixed;
        border-right:1.5px solid $gray-200;
        background:white;

        &.n-menu-large {
            width:250px;
        }

        > div {
            height:100%;
        }

        ul {

            li {
                span {
                    font-size:0.9em;
                }

                .icon {
                    font-size:1.3em;
                    color:$gray-600;

                    &:not(.collapsed) {
                        color: $gray-500;
                        display:block;
                        width:2em;
                    }
                }
            }
        }
    }
</style>
