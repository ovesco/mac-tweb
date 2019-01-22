<template>
    <div>
        <at-ta :ats="['#']" :members="tags" ref="at" :allow-spaces="false">
            <textarea class="smart-input" spellcheck="false"
                      @keydown="$emit('keydown', $event)"
                      @blur="handleBlur"
                      @input="$emit('update:value', $event.target.value)"
                      :placeholder="placeholder" title="">{{value}}</textarea>
        </at-ta>
    </div>
</template>

<script>
    import AtTa from 'vue-at/dist/vue-at-textarea';
    import { tagsQuery } from '../../graphql/TagQueries';

    export default {
        apollo: {
            tags: {
                query: tagsQuery,
                variables() {
                    return {
                        search: this.searchTag,
                    };
                },
                update(data) {
                    return data.tags.map(t => t.tag);
                },
            },
        },
        components: {
            AtTa,
        },
        computed: {
            searchTag() {
                const data = this.value.split(' ').pop();
                if (data.charAt(0) === '#' && data.length > 1) return data.substr(1);
                return null;
            },
        },
        data() {
            return {
                tags: [],
                content: '',
            };
        },
        methods: {
            handleBlur() {
                this.$refs.at.closePanel();
            },
        },
        props: {
            placeholder: { type: String, default: () => '' },
            title: { type: String, default: () => '' },
            value: { type: String, required: true },
            name: { type: String, default: () => '' },
        },
    };
</script>

<style scoped lang="scss">
    .smart-input {
        font-size:0.85rem;
        line-height:0.9em;
        height:1.7em;
        outline:none;
        border-width:0 0 1px 0;
        border-color: #eee;
        resize: none;
        width:100%;
        position:relative;
        z-index:10;
    }

    .placeholder {
        opacity:0.5;
        user-select: none;
        line-height:1em;
        font-size:0.85rem;
        position:absolute;
        margin-top:-1em;
    }
</style>
