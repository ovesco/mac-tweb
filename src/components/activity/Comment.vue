<template>
    <div>
        <div class="comment">
            <div class="d-flex align-items-lg-start">
                <user-picture :size="2.3" class="mr-lg-3 mt-lg-2" />
                <div class="comment-content">
                    <smart-username size="0.85em" class="mb-lg-1" />
                    <p class="m-0 content">
                        Lorem ipsum de la grosse bonne balle des familles, j'aime bien le caca
                        aussi parfois..
                    </p>
                    <div class="comment-meta d-flex">
                        <p class="m-0 text-black-50">Il y a 5 minutes</p>
                        <a href="#" class="ml-lg-2">Liker</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import userPicture from '../UserPicture.vue';
    import smartUsername from '../Smart/SmartUsername.vue';

    export default {
        components: {
            userPicture,
            smartUsername,
        },
    };
</script>

<style scoped lang="scss">
    .comment {
        p.content, p.username {
            line-height:1em;
            font-size:0.85em;

            &.username {
                font-weight:600;
            }
        }

        .comment-meta {

            font-size:0.7em;
        }
    }
</style>
