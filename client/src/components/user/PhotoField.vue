<template>
    <div>
        <div class="profile-picture" v-if="me !== null">
            <div>
                <el-upload class="avatar-upload"
                           ref="uploader"
                           action="null"
                           :before-upload="beforeAvatarUpload"
                           :on-change="checkFile"
                           accept="image/jpg,image/jpeg,image/png"
                           :on-error="error"
                           :show-file-list="false">
                    <div class="picture-container">
                        <img v-if="me.pictureKey" :src="pictureSrc">
                        <div class="no-picture d-flex align-items-center
                            justify-content-center" v-else>
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import { meQuery, changePictureMutation } from '../../graphql/UserQueries';

export default {
    apollo: {
        me: {
            query: meQuery,
        },
    },
    data() {
        return {
            me: null,
        };
    },
    computed: {
        pictureSrc() {
            return `${this.$store.getters['ui/serverUrl']}/file/${this.me.pictureKey}`;
        },
    },
    methods: {
        checkFile(file) {
            // Upload picture
            this.$apollo.mutate({
                mutation: changePictureMutation,
                variables: { data: { picture: file.raw } },
            }).then(({ data: { updateProfilePicture } }) => {
                this.me.pictureKey = updateProfilePicture;
                this.$toasted.success('Photo de profil changée');
                this.$apollo.queries.me.refetch();
            });
        },
        beforeAvatarUpload() {
            return false;
        },
        error(error) {
            console.log(error);
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .picture-container {
        width:6.8em;
        height:6.8em;
        border-radius:5px;
        overflow:hidden;

        img {
            width:100%;
            height:100%;
            position:relative;
        }

        .no-picture {
            width:100%;
            height:100%;
            border:3px dashed $gray-400;
            color:$gray-500;
            font-size:2em;

            &:hover {
                border-color: $gray-500;
            }
        }
    }
</style>
