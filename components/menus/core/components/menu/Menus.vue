<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'CoreMenus',

    inject: ['errorHandler', 'route'],

    props: {
        menus: {
            type: Array,
            required: true,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState('menu', ['editable']),
        disabled() {
            return !this.editable;
        },
    },

    watch: {
        collapsed: 'toggle',
    },

    mounted() {
        if (this.collapsed) {
            this.$el.style.height = 0;
        }
    },

    methods: {
        ...mapMutations('menu', ['organize']),
        shrink(height) {
            this.$el.style.height = `${parseInt(this.$el.style.height, 10) - height}px`;
            this.$emit('shrink', height);
        },
        extend(height) {
            this.$el.style.height = `${height + parseInt(this.$el.style.height, 10)}px`;
            this.$emit('extend', height);
        },
        toggle() {
            if (this.collapsed) {
                const height = this.$el.scrollHeight;

                if (!this.$el.style.height) {
                    this.$el.style.height = `${height}px`;
                }

                setTimeout(() => {
                    this.$el.style.height = 0;
                    this.$emit('shrink', height);
                }, 1);

                return;
            }

            this.$el.style.height = `${this.$el.scrollHeight}px`;
            this.$emit('extend', this.$el.scrollHeight);
        },
        persist() {
            this.$axios.put(this.route('system.menus.organize'), { menus: this.menus })
                .catch(this.errorHandler);
        },
    },

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
            parentMenuEvents: {
                shrink: this.shrink,
                extend: this.extend,
            },
            organizeBindings: {
                value: this.menus,
                disabled: this.disabled,
            },
            organizeEvents: {
                input: this.organize,
                end: this.persist,
            },
        });
    },
};
</script>
