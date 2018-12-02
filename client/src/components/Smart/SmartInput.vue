<template>
    <div>
        <at v-model="content" :ats="['@', '#']" :members="members">
            <div class="smart-input" contenteditable="true" @focus="onFocus" @blur="outFocus"></div>
            <span class="placeholder" v-if="showPlaceholder">Ecrire un commentaire...</span>
        </at>
    </div>
</template>

<script>
    import At from 'vue-at';

    export default {
        components: {
            At,
        },
        data() {
            return {
                focus: false,
                content: '',
                members: [
                    'yolo',
                    'swag',
                    'bim bim',
                    'stylé',
                ],
            };
        },
        props: {
            placeholder: { type: String, default: () => '' },
            title: { type: String, default: () => '' },
            value: { type: String, default: () => '' },
            name: { type: String, default: () => '' },
        },
        methods: {
            onFocus() {
                this.focus = true;
            },
            outFocus() {
                this.focus = false;
                if (this.content.replace(/<\/?[^>]+(>|$)/g, '') === '') this.content = '';
            },
        },
        computed: {
            showPlaceholder() {
                return this.focus === false && !this.content.trim();
            },
        },
    };
</script>

<style scoped lang="scss">
    .smart-input {
        font-size:0.85rem;
        line-height:1em;
        min-height:1em;
        outline:none;
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
