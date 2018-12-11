<template>
    <div>
        <div class="activity-card p-5">
            <div class="pt-lg-3 pb-lg-5">
                <smart-input v-on:change="handleChange"
                    placeholder="Exprimez-vous ou décrivez les fichiers que vous allez uploader..."
                />
            </div>
            <div>
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
                        Seuls les PDFs et les images sont supportés,
                        n'oubliez pas d'ajouter des #hashtags
                    </div>
                </el-upload>
                <div class="d-flex justify-content-end pt-2"
                     v-if="fileList.length > 0 && description.length > 0">
                    <button class="btn btn-primary btn-small" @click="publish">Publier</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SmartInput from '../Smart/SmartInput.vue';
    import { uploadQuery } from '../../graphql/FileQueries';
    import { addActivityQuery, feedQuery } from '../../graphql/ActivityQueries';

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
            },
            handleChange(d) {
                this.description = d;
            },
            fileRemoved(file) {
                const index = this.fileList.indexOf(file);
                if (index !== -1) this.fileList.splice(index, 1);
            },
            publish() {
                this.$apollo.mutate({
                    mutation: addActivityQuery,
                    variables: { data: { content: this.description } },
                    update: (cache, { data }) => {
                        const { feed } = cache.readQuery({ query: feedQuery });
                        feed.unshift(data.addActivity);
                    },
                }).then(({ data }) => {
                    // Activity creation success, start uploading files if any
                    if (this.fileList.length > 0) this.upload(data.addActivity._key);
                });
            },
            upload(activityKey) {
                /* eslint-disable */
                Promise.all(this.fileList.map((item) => {
                    return this.$apollo.mutate({
                        mutation: uploadQuery,
                        variables: { file: { upload: item.raw, activityKey } },
                        update: (cache, { data }) => {

                            const { feed } = cache.readQuery({ query: feedQuery });
                            const activities = feed.filter(a => a._key === activityKey);
                            if (activities.length === 0) return;
                            activities[0].files.push(data.uploadActivityFile);
                        },
                    }).catch(e => {
                        console.log(e);
                    });
                })).then((res) => {
                    // console.log(res);
                }).catch((e) => {
                    console.log(e);
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
