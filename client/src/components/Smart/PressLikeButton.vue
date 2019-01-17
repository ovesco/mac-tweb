<template>
    <div>
        <button class="btn btn-primary btn-small" v-bind:class="{
            'focused' : press,
            'btn-primary': state === LIKE || action === LIKE,
            'btn-success': state === STAR || action === STAR,
            'btn-danger' : state === SAVE || action === SAVE,
            'btn-outline' : state !== null,
        }" ref="button">
            <span v-if="(action === LIKE && state === null) || state === LIKE">
                Like <icon icon="thumbs-up" />
            </span>
            <span v-if="action === STAR || state === STAR">Star <icon icon="star" /></span>
            <span v-if="action === SAVE || state === SAVE">Savior! <icon icon="heart" /></span>
        </button>
    </div>
</template>

<script>
    import LikeMixin from '../../mixins/LikeMixin';
    import { LikeQuery, likeCacheFragments } from '../../graphql/LikeQueries';

    const actions = {
        LIKE: 'LIKE',
        STAR: 'STAR',
        SAVE: 'SAVE',
        DELETE: 'DELETE',
    };

    export default {
        props: {
            itemId: {
                type: String,
                required: true,
            },
        },
        computed: {
            itemKey() {
                return this.itemId.split('/').pop();
            },
            state() {
                return this.isLiked() ? this.isLiked().type : null;
            },
        },
        mixins: [LikeMixin],
        mounted() {
            const btn = this.getButton();

            btn.addEventListener('mousedown', () => {
                this.start();
                this.press = true;
            });

            btn.addEventListener('mouseup', () => {
                if (this.press) this.finished();
                this.press = false;
            });

            btn.addEventListener('mouseleave', () => {
                this.clear();
            });
        },
        data() {
            return {
                press: false,
                timer: null,
                action: actions.LIKE,
                ...actions,
            };
        },
        methods: {
            start() {
                if (this.state === null) {
                    const $this = this;
                    this.timer = setTimeout(() => {
                        $this.action = actions.STAR;
                        $this.timer = setTimeout(() => {
                            $this.action = actions.SAVE;
                            $this.timer = setTimeout(() => {
                                $this.finished();
                            }, 1000);
                        }, 1000);
                    }, 1000);
                } else {
                    this.action = actions.DELETE;
                }
            },
            finished() {
                this.mutate(this.action).then(() => {
                    this.clear();
                });
            },
            async mutate(type) {
                return this.$apollo.mutate({
                    mutation: LikeQuery,
                    variables: {
                        type,
                        itemId: this.itemId,
                    },
                    update: (cache, { data }) => {
                        const { like } = data;
                        const fragmentName = this.itemId.startsWith('files') ? 'File' : 'Activity';
                        const fragment = this.itemId.startsWith('files')
                            ? likeCacheFragments.file : likeCacheFragments.activity;
                        const item = cache.readFragment({
                            id: this.itemId,
                            fragmentName: `searchLikes${fragmentName}`,
                            fragment: fragment.read,
                        });

                        if (type === actions.DELETE) {
                            const index = item.likes.findIndex(e => e.userKey === this.currentKey);
                            if (index > -1) item.likes.splice(index, 1);
                        } else item.likes.push(like);
                        cache.writeFragment({
                            id: this.itemId,
                            data: item,
                            fragmentName: `updateLikes${fragmentName}`,
                            fragment: fragment.write,
                        });

                        console.log(JSON.stringify(item));
                        const item2 = cache.readFragment({
                            id: this.itemId,
                            fragmentName: `searchLikes${fragmentName}`,
                            fragment: fragment.read,
                        });
                        console.log(JSON.stringify(item2.likes));
                    },
                });
            },
            clear() {
                this.action = actions.LIKE;
                if (this.timer) clearTimeout(this.timer);
                this.timer = null;
                this.press = false;
            },
            getButton() {
                return this.$refs.button;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";
    @each $theme, $color in $themes {
        @keyframes transition-#{$theme} {
            0% {background-color: $color}
            100% {background-color: darken($color, 30%)}
        }
    }

    button {
        outline: none;

        &.focused {
            @each $theme, $color in $themes {
                &.btn-#{$theme} {
                    animation-name: transition-#{$theme};
                    animation-duration: 1.5s;
                }
            }
        }
    }
</style>
