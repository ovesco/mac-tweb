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
    import SmartMixin from '../../mixins/SmartMixin';

    export default {
        mixins: [
            SmartMixin,
        ],
        components: {
            UserInfo,
        },
    };
</script>
