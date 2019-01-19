export default {
    computed: {
        currentKey() {
            return this.$store.state.security.userKey;
        },
        currentId() {
            return this.$store.state.security.userId;
        },
    },
    methods: {
        isLiked() {
            const userLikes = this.likes.filter(like => like._from === this.currentId);
            return userLikes.length === 1 ? userLikes[0] : null;
        },
    },
    props: {
        likes: {
            type: Array,
            default: () => [],
        },
    },
};
