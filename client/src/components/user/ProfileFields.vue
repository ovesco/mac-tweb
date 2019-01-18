<template>
    <div>
        <form @submit.prevent="updateProfile">
            <div class="mb-2">
                <el-input placeholder="Nom" size="small"
                          v-model="me.name"></el-input>
            </div>
            <div class="mb-2">
                <el-input placeholder="Email" size="small"
                          v-model="me.email"></el-input>
            </div>
            <button class="btn btn-primary btn-small">
                <span>Sauvegarder</span>
            </button>
        </form>
        <form @submit.prevent="updatePassword">
            <h2 class="text-black-50 pt-4 mt-5 font-weight-normal">Changer de mot de passe</h2>
            <div class="mb-2">
                <el-input placeholder="Mot de passe" size="small"
                          v-model="oldPassword"></el-input>
            </div>
            <div class="mb-2">
                <el-input placeholder="Mot de passe" size="small"
                          v-model="newPassword"></el-input>
            </div>
            <button class="btn btn-primary btn-small">
                <span>Sauvegarder</span>
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
            me: {
                name: '',
                email: '',
            },
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
        updateProfile() {
            const { name, email } = this.me;
            this.$apollo.mutate({
                mutation: updateMeMutation,
                variables: { data: { name, email } },
            }).then(() => {
                this.$toasted.success('Profil mis à jour');
            });
        },
    },
};
</script>
