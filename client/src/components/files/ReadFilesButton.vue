<template>
    <div>
        <button class="btn btn-white"
                @click="readFiles">
            <icon icon="external-link-alt" class="text-black-50 mr-1" />
            Ouvrir {{ files.length }} fichiers
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            files: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            readFiles() {
                if (this.files.length > 0) {
                    this.files.forEach((file) => {
                        this.$store.commit('addFileToWatch', file);
                    });
                }
            },
        },
    };
</script>
