<template>
    <div>
        <form @submit.prevent="updatePassword">
            <div class="mb-2">
                <el-input placeholder="Mot de passe actuel" size="small"
                          type="password"
                          v-model="oldPassword"></el-input>
            </div>
            <div class="mb-2">
                <el-input placeholder="Nouveau mot de passe" size="small"
                          type="password"
                          v-model="newPassword"></el-input>
            </div>
            <button class="btn btn-primary btn-small">
                <span>Changer de mot de passe</span>
            </button>
        </form>
    </div>
</template>

<script>
import { meQuery, updateMeMutation } from '../../graphql/UserQueries';

export default {
    apollo: {
        me: {
            query: meQuery,
        },
    },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
        };
    },
    methods: {
        updatePassword() {
            const { oldPassword, newPassword } = this;
            this.$apollo.mutate({
                mutation: updateMeMutation,
                variables: { data: { oldPassword, newPassword } },
            }).then(() => {
                this.$toasted.success('Profil mis à jour');
            }).catch((e) => {
                console.log(e);
            });
        },
    },
};
</script>
