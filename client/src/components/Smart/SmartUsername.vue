<template>
    <div>
        <el-popover
                :open-delay="700"
                placement="top-start"
                width="270"
                @show="reload"
                trigger="hover">
            <user-info :user-key="user._key" ref="infos" />
            <a href="#" slot="reference" class="m-0" v-bind:style="smartStyle">{{ user.name }}</a>
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
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        methods: {
            reload() {
                this.$refs.infos.reload();
            },
        },
        components: {
            UserInfo,
        },
    };
</script>
