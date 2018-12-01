<template>
    <div>
        <input :title="title" type="text" :name="name" :placeholder="placeholder" v-model="value" />
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: { type: String, default: () => '' },
            title: { type: String, default: () => '' },
            value: { type: String, default: () => '' },
            name: { type: String, default: () => '' },
        },
    };
</script>

<style scoped>
    input[type=text] {
        border:0;
        font-size:0.85em;
        outline:none;
    }
</style>
