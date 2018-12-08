<template>
    <div>
        <div class="container-md pt-lg-5">
            <div class="mb-5"><add-activity /></div>
            <div>
                <card-activity>
                    <div slot="text">
                        Yo les soss voila les fameux tests!
                    </div>
                    <div>
                        <activity-files :files="files" :show="3"
                                        class="pl-lg-3 pr-lg-3 pt-lg-5 pb-lg-5" />
                    </div>
                </card-activity>
            </div>
        </div>
    </div>
</template>

<script>
    import addActivity from '../components/activity/AddActivity.vue';
    import cardActivity from '../components/activity/ActivityCard.vue';
    import activityFiles from '../components/activity/ActivityFiles.vue';
    import DummyFiles from '../assets/DummyFiles';

    export default {
        components: {
            addActivity,
            cardActivity,
            activityFiles,
        },
        data() {
            return {
                files: DummyFiles,
            };
        },
    };
</script>
