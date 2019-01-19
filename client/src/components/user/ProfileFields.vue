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
        };
    },
    methods: {
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
