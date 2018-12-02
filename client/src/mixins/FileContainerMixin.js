import smartUsername from '../components/Smart/SmartUsername.vue';
import fileTag from '../components/files/FileTag.vue';

export default {
    components: {
        smartUsername,
        fileTag,
    },
    methods: {
        selectFiles(val) {
            this.files.forEach((file) => {
                /* eslint-disable no-param-reassign */
                file.selected = false;
            });

            val.forEach((item) => {
                /* eslint-disable no-param-reassign */
                item.selected = true;
            });
        },
    },
};
