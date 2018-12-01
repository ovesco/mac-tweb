<template>
    <div>
        <p class="m-0" v-bind:style="style">Jean machin Bidule</p>
    </div>
</template>

<script>
    export default {
        props: {
            color: { type: String, default: () => 'black' },
            size: { type: String, default: () => '1em' },
            weight: { type: Number, default: () => 600 },
        },
        computed: {
            style() {
                return {
                    fontSize: this.size,
                    color: this.color,
                    fontWeight: this.weight,
                };
            },
        },
    };
</script>
