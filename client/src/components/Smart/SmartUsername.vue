<template>
    <div>
        <el-popover
                :open-delay="700"
                placement="top-start"
                width="270"
                v-on:show="show = true"
                v-on:after-leave="show = false"
                trigger="hover">
            <user-info :user-key="user._key" v-if="show" />
            <a href="#" slot="reference" class="m-0" v-bind:style="smartStyle">{{ user.name }}</a>
        </el-popover>
        {{show}}
    </div>
</template>

<script>
    import UserInfo from '../user/UserInfo.vue';
    import SmartMixin from '../../mixins/SmartMixin';

    export default {
        mixins: [
            SmartMixin,
        ],
        data() {
            return {
                show: false,
            };
        },
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        components: {
            UserInfo,
        },
    };
</script>
