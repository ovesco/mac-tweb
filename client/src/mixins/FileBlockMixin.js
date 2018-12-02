import fileTag from '../components/files/FileTag.vue';
import fileIcon from '../components/files/FileIcon.vue';
import FilePropMixin from './FilePropMixin';

export default {
    components: {
        fileTag,
        fileIcon,
    },
    mixins: [
        FilePropMixin,
    ],
};
