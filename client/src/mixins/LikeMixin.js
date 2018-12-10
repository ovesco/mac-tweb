export default {
    computed: {
        currentKey() {
            return this.$store.state.security.userKey;
        },
    },
    methods: {
        isLiked() {
            const userLikes = this.likes.filter(like => like.userKey === this.currentKey);
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
