<template>
    <div>
        <div class="full">
            <div class="d-flex container-md form-container flex-column justify-content-center">
                <div class="form p-5">
                    <div class="row">
                        <form @submit="submit" class="col-sm-6">
                            <div class="mb-2">
                                <el-input placeholder="Nom d'utilisateur" size="small"
                                          v-model="form.username"></el-input>
                            </div>
                            <div class="mb-2" v-if="createAccount">
                                <el-input placeholder="Nom" size="small"
                                          v-model="form.name"></el-input>
                            </div>
                            <div class="mb-2" v-if="createAccount">
                                <el-input placeholder="Email" size="small"
                                          v-model="form.email"></el-input>
                            </div>
                            <div class="mb-2">
                                <el-input placeholder="Mot de passe" size="small"
                                          v-model="form.password"></el-input>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-primary btn-small">
                                        <span v-if="!createAccount">Connexion</span>
                                        <span v-else>M'enregistrer</span>
                                    </button>
                                </div>
                                <div class="col-8 d-flex justify-content-end align-items-center">
                                    <p class="meta m-0">Pas de compte?</p>
                                    <el-switch v-model="createAccount" class="ml-2" />
                                </div>
                            </div>
                        </form>

                        <div class="col-sm-6">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import { loginQuery, registerQuery } from '../graphql/AuthQueries';

    export default {
        data() {
            return {
                createAccount: false,
                form: {
                    username: '',
                    name: '',
                    email: '',
                    password: '',
                },
            };
        },
        methods: {
            async submit($event) {
                $event.preventDefault();
                const variables = this.createAccount
                    ? { data: { ...this.form } }
                    : { username: this.form.username, password: this.form.password };

                console.log(variables);
                return this.$apollo.mutate({
                    mutation: gql`${this.createAccount ? registerQuery : loginQuery}`,
                    variables,
                }).then((result) => {
                    const localKey = this.createAccount
                        ? result.data.addUser.localKey
                        : result.data.login.localKey;
                    if (localKey === undefined) {
                        this.$toasted.show('Nom d\'utilisateur ou mot de passe incorrect', { type: 'error' });
                    } else {
                        console.log(localKey);
                        this.$store.commit('security/login', localKey);
                        this.$router.push({ name: 'home' });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/variables";

    .full {
        background: $gray-100;

        .container-md {

            &, .form-container {
                height:100vh;
            }

            .form {
                background:white;
                border:1px solid $gray-200;
                border-radius:3px;

                form {
                    border-right:1px solid $gray-200;

                    .meta {
                        font-size:0.8em;
                    }
                }
            }
        }
    }
</style>
