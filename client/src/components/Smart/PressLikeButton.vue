<template>
    <div>
        <button class="btn btn-primary btn-small ml-2" v-bind:class="{
            'focused' : press,
            'btn-primary': action === LIKE || done === LIKE,
            'btn-success': action === STAR || done === STAR,
            'btn-danger' : action === SAVE || done === SAVE,
            'btn-outline' : done !== null,
        }" ref="button">
            <span v-if="(action === LIKE && done === null) || done === LIKE">
                Like <icon icon="thumbs-up" />
            </span>
            <span v-if="action === STAR || done === STAR">Star <icon icon="star" /></span>
            <span v-if="action === SAVE || done === SAVE">Savior! <icon icon="heart" /></span>
        </button>
    </div>
</template>

<script>
    const actions = {
        LIKE: 'like',
        STAR: 'star',
        SAVE: 'save',
    };

    export default {
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
                done: null,
                timer: null,
                action: actions.LIKE,
                ...actions,
            };
        },
        methods: {
            start() {
                if (this.done === null) {
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
                }
            },
            finished() {
                this.done = this.done === null ? this.action : null;
                this.clear();
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
