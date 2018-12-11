export default {
    methods: {
        getActivity(feed, activityId) {
            const activities = feed.filter(a => a._id === activityId);
            return activities.length !== 1 ? null : activities[0];
        },
    },
};
