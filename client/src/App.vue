<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import Bus from './Bus';

export default {
    mounted() {
        Bus.$on('graphql-error', (message) => {
            this.$toasted.error(message);
        });
    },
};
</script>
