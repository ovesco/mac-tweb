<template>
    <div>
        <div class="file-tag">
            <el-tag :size="size">#{{ tag }}</el-tag>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: () => 'small',
            },
            tag: {
                type: String,
                required: true,
            },
        },
    };
</script>

<style scoped lang="scss">
    .file-tag {

        .el-tag {
            cursor:pointer;
        }
    }
</style>
