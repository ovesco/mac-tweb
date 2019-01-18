<template>
    <div>
        <div class="full">
            <div class="d-flex form-container flex-column justify-content-center"
                :class="{'container-sm': !createAccount, 'container-md': createAccount}">
                <div class="form p-5">
                    <img src="../assets/images/logo.png" class="mb-3" />
                    <h3 class="text-center text-black-50 m-0 font-400">Colibri</h3>
                    <h5 class="text-center text-black-50 font-400 mb-5">
                        Partage de fichiers collaboratif
                    </h5>
                    <hr class="mb-5">
                    <div class="row">
                        <div class="col-12" :class="{'col-md-6': createAccount}">
                            <form @submit="submit">
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
                                <div class="row mt-5">
                                    <div class="col-4">
                                        <button class="btn btn-primary btn-small">
                                            <span v-if="!createAccount">Connexion</span>
                                            <span v-else>M'enregistrer</span>
                                        </button>
                                    </div>
                                    <div class="col-8 d-flex justify-content-end
                                            align-items-center">
                                        <p class="meta m-0">Pas de compte?</p>
                                        <el-switch v-model="createAccount" class="ml-2" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-12" :class="{'col-md-6': createAccount}">
                            <div v-if="createAccount" class="description text-black-50">
                                <p>
                                    Colibri est un petit réseau social permettant aux gens de
                                    partager facilement des fichiers comme des PDFs et des images.
                                </p>
                                <p>
                                    Chaque fichier et activité est identifiée par des tags que vous
                                    pourrez suivre afin de recevoir des actualités plus adaptées.
                                </p>
                            </div>
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
                return this.$apollo.mutate({
                    mutation: gql`${this.createAccount ? registerQuery : loginQuery}`,
                    variables,
                }).then(({ data }) => {
                    const result = this.createAccount ? data.addUser : data.login;
                    if (result === null) {
                        this.$toasted.show('Nom d\'utilisateur ou mot de passe incorrect', { type: 'error' });
                        return;
                    }
                    const localKey = result.token;
                    this.$store.commit('security/login', {
                        token: localKey,
                        userId: result.user._id,
                    });
                    this.$router.push({ name: 'home' });
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
        background-image: url('../assets/images/login_bg.jpeg');
        background-size: cover;

        .form-container {

            height:100vh;

            .form {
                background:white;
                border:1px solid $gray-200;
                border-radius:3px;

                img {
                    width:4rem;
                    display:block;
                    margin:auto;
                }

                form {
                    .meta {
                        font-size:0.8em;
                    }
                }
            }
        }

        .description {
            font-size:0.85rem;
        }
    }
</style>
