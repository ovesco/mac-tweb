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
                <div class="search pt-lg-3 pb-lg-3 d-flex align-items-center">
                    <div class="input-search-container pl-lg-3">
                        <input type="text" title="Search" placeholder="Rechercher..." />
                    </div>
                </div>
            </div>
            <div class="d-lg-flex p-lg-3 align-items-lg-center">
                <div class="d-lg-flex">
                    <div class="action pl-lg-3 pr-lg-3">
                        <i class="el-icon-bell"></i>
                    </div>
                    <div class="action pl-lg-3 pr-lg-3">
                        <i class="el-icon-setting"></i>
                    </div>
                </div>
                <div class="user-menu ml-lg-3 mr-lg-3">
                    <el-dropdown>
                        <div class="image-container">
                            <img src="./../assets/images/face.jpeg" />
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../assets/scss/variables";

    .header {

        width: 100%;
        border-bottom:1.5px solid $gray-200;
        background:white;

        .search {

            .input-search-container {

                border-left:1px solid $gray-300;

                input[type=text] {
                    border:none;
                    font-size:0.9rem;
                }
            }
        }

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

        .action {
            font-size:1.3em;
            color:$gray-500;
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
</style>
