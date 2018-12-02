export default {
    computed: {
        selected() {
            return this.files.filter(file => file.selected);
        },
    },
};
