<template>
    <div>
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
        <div class="mb-2" v-if="createAccount">
            <tags-chooser v-model="tags"
                          placeholder="S'abonner à des tags" />
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

    </div>
</template>
