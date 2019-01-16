<template>
    <div>
        <activity-card :activity="activity" :show-likes="showLikes" :show-comments="showComments">
            <div slot="text" v-if="activity.content"
                 v-html="activity.content"></div>
            <activity-files :files="activity.files"
                            class="pl-lg-3 pr-lg-3 pt-lg-5 pb-lg-5"
                            v-if="activity.files && activity.files.length > 0" />
        </activity-card>
    </div>
</template>

<script>
import activityCard from './ActivityCard.vue';
import activityFiles from './ActivityFiles.vue';

export default {
    props: {
        activity: Object,
        showLikes: { type: Boolean, default: () => true },
        showComments: { type: Boolean, default: () => true },
    },
    components: {
        activityCard,
        activityFiles,
    },
};
</script>
