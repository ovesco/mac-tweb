import fileTag from '../components/files/FileTag.vue';
import fileIcon from '../components/files/FileIcon.vue';

export default {
    components: {
        fileTag,
        fileIcon,
    },
    props: {
        file: {
            type: Object,
            required: true,
        },
    },
};
