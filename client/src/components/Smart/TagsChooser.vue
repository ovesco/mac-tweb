<template>
    <el-select v-model="selectedTags" multiple :loading="loading"
               :remote-method="remoteQuery" style="width:100%;"
               filterable remote :placeholder="placeholder || 'Choisir des tags'">
        <el-option v-for="tagOption in choiceTags" :key="tagOption._key"
                   :label="'#' + tagOption.tag" :value="tagOption.tag" />
    </el-select>
</template>

<script>
    import { tagsQuery } from '../../graphql/TagQueries';

    export default {
        props: ['value', 'placeholder'],
        data() {
            return {
                choiceTags: [],
                selectedTags: [],
                loading: false,
            };
        },
        watch: {
            selectedTags(val) {
                this.$emit('input', val);
            },
        },
        methods: {
            async remoteQuery(input) {
                this.loading = true;
                const query = input.replace('#', '');
                this.$apollo.query({
                    query: tagsQuery,
                    variables: {
                        search: query,
                    },
                }).then(({ data: { tags } }) => {
                    this.choiceTags.splice(0);
                    tags.forEach((tag) => {
                        this.choiceTags.push(tag);
                    });
                    this.loading = false;
                });
            },
        },
    };
</script>
