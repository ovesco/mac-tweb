<template>
    <div>
        <icon icon="file-pdf" v-if="mime === 'application/pdf'" />
        <icon icon="file-image" v-else-if="mime.startsWith('image')" />
    </div>
</template>

<script>
    export default {
        props: {
            mime: {
                type: String,
                required: true,
            },
        },
    };
</script>
