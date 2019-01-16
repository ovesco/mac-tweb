<template>
    <div>
        <div class="header fixed-top d-lg-flex justify-content-lg-between">
            <div class="left d-flex">
                <div class="logo d-flex align-items-center pl-lg-3">
                    <div class="mr-lg-3">
                        <img src="../assets/images/logo.png" />
                    </div>
                    <p class="title m-lg-0 pr-lg-2">Colibri</p>
                    <p class="m-lg-0">Collaboration</p>
                </div>
            </div>
            <div class="d-lg-flex p-lg-3 align-items-lg-center">
                <div class="d-lg-flex pr-3 pt-2">
                    <el-badge is-dot class="item" :hidden="!$store.getters['ui/notified']">
                        <i class="el-icon-bell action notifications-manager"
                           :class="{
                                active: $store.getters['ui/notified'],
                                focus: $store.getters['ui/showNotifications'],
                            }"
                           @click="$store.commit('ui/showNotifications',
                                !$store.getters['ui/showNotifications'])"
                        ></i>
                    </el-badge>
                </div>
                <div class="user-menu ml-lg-3 mr-lg-3">
                    <el-dropdown>
                        <div class="image-container">
                            <img src="./../assets/images/face.jpeg" />
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="$store.commit('security/logout')">Logout</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .header {

        width: 100%;
        border-bottom:1.5px solid $gray-200;
        background:white;

        .logo {

            width:249px;

            img {
                width:3em;
            }

            p {
                color:$gray-500;
                font-size:0.8em;
                padding-top:0.2em;

                &.title {
                    color:$gray-600;
                    font-weight:600;
                    font-size:1em;
                    padding-top:0;
                }
            }
        }

        .user-menu {

            line-height:0;

            .image-container {
                width:2.7em;
                height:2.7em;
                border-radius:100px;
            }
        }
    }

    .action {
        font-size:1.5em;
        color:$gray-500;
        cursor:pointer;

        &.active {
            color: red;
        }

        &.focus {
            color: #5692ff !important;
            text-shadow: 0 0 10px #5692ff;
        }
    }
</style>
