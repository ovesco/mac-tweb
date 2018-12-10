<template>
    <div>
        <button class="btn btn-primary btn-small ml-2" v-bind:class="{
            'focused' : press,
            'btn-primary': action === LIKE || state === LIKE,
            'btn-success': action === STAR || state === STAR,
            'btn-danger' : action === SAVE || state === SAVE,
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
    import { LikeQuery } from '../../graphql/LikeQueries';
    import { feedQuery } from '../../graphql/ActivityQueries';
    import { fileQuery } from '../../graphql/FileQueries';
    import LikeMixin from '../../mixins/LikeMixin';

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

            this.state = this.isLiked() ? this.isLiked().type : null;
        },
        data() {
            return {
                press: false,
                state: null,
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
                    this.state = this.state === null ? this.action : null;
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
                        if (this.itemId.startsWith('activities')) {
                            const { feed } = cache.readQuery({ query: feedQuery });
                            const { likes } = feed.filter(a => a._id === this.itemId)[0];
                            this.updateCacheLikes(type, likes, like);
                        } else if (this.itemId.startsWith('files')) {
                            const { file } = cache.readQuery({
                                query: fileQuery,
                                variables: { fileKey: this.itemKey },
                            });
                            this.updateCacheLikes(type, file.likes, like);
                        }

                        // handle dude's reputation
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
            updateCacheLikes(type, likes, newLike) {
                if (type === actions.DELETE) {
                    const index = likes.findIndex(e => e.userKey === this.currentKey);
                    if (index > -1) likes.splice(index, 1);
                } else likes.push(newLike);
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
