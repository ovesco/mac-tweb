<template>
    <div>
        <div class="activity-content pt-lg-5">
            <div>
                <card-activity>
                    <div slot="text">
                        Yo les soss voila les fameux tests!
                    </div>
                    <div>
                        <div class="d-flex p-lg-5">
                            <file-preview class="flex-grow-1"></file-preview>
                            <file-preview class="flex-grow-1 pl-lg-5 pr-lg-5"></file-preview>
                            <file-preview class="flex-grow-1"></file-preview>
                        </div>
                    </div>
                </card-activity>
            </div>
        </div>
    </div>
</template>

<script>
    import cardActivity from '../components/activity/Card.vue';
    import filePreview from '../components/activity/FilePreview.vue';

    export default {
        components: {
            cardActivity,
            filePreview,
        },
    };
</script>

<style>
    .activity-content {
        max-width:600px;
        width:100%;
        margin:auto;
    }
</style>
