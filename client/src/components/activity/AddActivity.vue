<template>
    <div>
        <div class="activity-card p-5">
            <div class="pt-lg-3 pb-lg-5">
                <smart-input :value.sync="description"
                        placeholder="Exprimez-vous ou décrivez les fichiers
                    que vous allez uploader..."
                />
            </div>
            <div class="upload-zone">
                <el-upload class="activity-drag"
                        ref="uploader"
                        drag
                        action="null"
                        :auto-upload="false"
                        :on-change="fileAdded"
                        :before-remove="fileRemoved"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        Déposez des fichiers ici
                        <em>ou cliquez pour choisir</em>
                    </div>
                    <div class="el-upload__tip text-black-50" slot="tip">
                        Seul les PDFs et les images sont supportés,
                        n'oubliez pas d'ajouter des #hashtags
                    </div>
                </el-upload>
                <div class="d-flex justify-content-end pt-2" v-if="fileList.length > 0">
                    <button class="btn btn-primary btn-small" @click="upload">Publier</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SmartInput from '../Smart/SmartInput.vue';
    import { uploadQuery } from '../../graphql/FileQueries';

    export default {
        components: {
            SmartInput,
        },
        data() {
            return {
                fileList: [],
                description: '',
            };
        },
        methods: {
            fileAdded(file) {
                this.fileList.push(file);
                console.log(file);
            },
            fileRemoved(file) {
                const index = this.fileList.indexOf(file);
                if (index !== -1) this.fileList.splice(index, 1);
            },
            upload() {
                // eslint-disable-next-line arrow-body-style
                const files = this.fileList.map((item) => {
                    return {
                        upload: item.raw,
                        description: this.description,
                    };
                });
                this.$apollo.mutate({
                    mutation: uploadQuery,
                    variables: { files },
                }).then((result) => {
                    console.log(result);
                });
            },
        },
    };
</script>

<style lang="scss">
    .activity-drag {
        div {
            width:100%;
        }
    }
</style>
