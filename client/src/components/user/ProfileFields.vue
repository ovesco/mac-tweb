<template>
    <div>
        <div class="mb-2">
            <el-input placeholder="Nom" size="small"
                      v-model="name"></el-input>
        </div>
        <div class="mb-2">
            <el-input placeholder="Email" size="small"
                      v-model="email"></el-input>
        </div>
        <div class="mb-2">
            <tags-chooser v-model="tags"
                          placeholder="S'abonner à des tags" />
        </div>
        <hr/>
        <div class="mb-2">
            <el-input placeholder="Mot de passe" size="small"
                      v-model="oldPassword"></el-input>
        </div>
        <div class="mb-2">
            <el-input placeholder="Mot de passe" size="small"
                      v-model="newPassword"></el-input>
        </div>
    </div>
</template>

<script>
import TagsChooser from '../Smart/TagsChooser.vue';

export default {
    components: {
        TagsChooser,
    },
    data() {
        return {
            name: '',
            email: '',
            tags: [],
            oldPassword: '',
            newPassword: '',
        };
    },
};
</script>
