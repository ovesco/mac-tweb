<template>
    <div>
        <at-ta v-model="content" :ats="['#']" :members="members">
            <textarea class="smart-input" spellcheck="false"
                      @keydown="keydown"
                      :placeholder="placeholder" title="">
            </textarea>
        </at-ta>
    </div>
</template>

<script>
    import AtTa from 'vue-at/dist/vue-at-textarea';

    export default {
        components: {
            AtTa,
        },
        data() {
            return {
                content: '',
                members: [
                    'yolo',
                    'swag',
                    'bim bim',
                    'stylé',
                ],
            };
        },
        methods: {
            keydown($event) {
                this.$emit('change', this.content, $event);
            },
        },
        props: {
            placeholder: { type: String, default: () => '' },
            title: { type: String, default: () => '' },
            value: { type: String, default: () => '' },
            name: { type: String, default: () => '' },
        },
    };
</script>

<style scoped lang="scss">
    .smart-input {
        font-size:0.85rem;
        line-height:0.9em;
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
