<template>
    <div>
        <el-popover
                :open-delay="700"
                placement="top-start"
                width="270"
                trigger="hover">
            <user-info />
            <a href="#" slot="reference" class="m-0" v-bind:style="style">Jean machin Bidule</a>
        </el-popover>
    </div>
</template>

<script>
    import UserInfo from '../user/UserInfo.vue';

    export default {
        components: {
            UserInfo,
        },
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
