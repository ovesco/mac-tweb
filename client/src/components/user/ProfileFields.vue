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
    </div>
</template>

<script>
export default {

}
</script>
