export default {
    props: {
        file: {
            type: Object,
            required: true,
        },
    },
    computed: {
        fileSrc() {
            return `http://localhost:4000/file/${this.file._key}`;
        },
    },
};
