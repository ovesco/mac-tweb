<template>
    <div>
        <at-ta :ats="['#']" :members="members" ref="at">
            <textarea class="smart-input" spellcheck="false"
                      @keydown="$emit('keydown', $event)"
                      @blur="handleBlur"
                      @input="$emit('update:value', $event.target.value) && log()"
                      :placeholder="placeholder" title="">{{value}}</textarea>
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
            handleBlur() {
                this.$refs.at.closePanel();
            },
            log() {
                console.log(this.$refs.at._data.atwho);
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
