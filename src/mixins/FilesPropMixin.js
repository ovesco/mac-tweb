import FileSelectionMixin from './FileSelectionMixin';

export default {
    mixins: [
        FileSelectionMixin,
    ],
    props: {
        files: {
            type: Array,
            required: true,
        },
    },
};
