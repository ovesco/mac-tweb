export default {
    props: {
        file: {
            type: Object,
            required: true,
        },
    },
    computed: {
        fileSrc() {
            return `${this.$store.getters['ui/serverUrl']}/file/${this.file._key}`;
        },
    },
};
