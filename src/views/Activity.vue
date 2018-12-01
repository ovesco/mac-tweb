<template>
    <div>
        <div class="container-md pt-lg-5">
            <div>
                <card-activity>
                    <div slot="text">
                        Yo les soss voila les fameux tests!
                    </div>
                    <div>
                        <activity-files class="pl-lg-3 pr-lg-3 pt-lg-5 pb-lg-5" />
                    </div>
                </card-activity>
            </div>
        </div>
    </div>
</template>

<script>
    import cardActivity from '../components/activity/ActivityCard.vue';
    import activityFiles from '../components/activity/ActivityFiles.vue';

    export default {
        components: {
            cardActivity,
            activityFiles,
        },
    };
</script>
