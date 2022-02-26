<script>
import { mapState, mapMutations } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

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
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[menu].editable)
        }
        const disabled = computed(() => {
            return !this.editable;
        })
        const collapsed = ref('')
        watch(collapsed, () => {
            const collapsed = ref('toggle')
        })
        onMounted(() => {
            if (this.collapsed) {
                this.$el.style.height = 0;
            }
        })
        return {
            ...mapMutations('menu', ['organize']),
        }
        function shrink(height) {
            this.$el.style.height = `${parseInt(this.$el.style.height, 10) - height}px`;
            this.$emit('shrink', height);
        }
        function extend(height) {
            this.$el.style.height = `${height + parseInt(this.$el.style.height, 10)}px`;
            this.$emit('extend', height);
        }
        function toggle() {
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
        }
        function persist() {
            this.$axios.put(this.route('system.menus.organize'), { menus: this.menus })
                .catch(this.errorHandler);
        }
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
