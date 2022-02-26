<script>
import { mapState } from 'vuex';
import { isAfter } from 'date-fns';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreOperation',

    props: {
        operation: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const end = ref(true)
        const elapsed = ref(null)
        const remaining = ref(null)
        const updater = ref(null)
        const store = useStore()
        return {
            one: computed(() => store.state[enums])
        }
        onBeforeMount(() => {
            this.update();
            this.autoUpdate();
        })
        onBeforeUnmount(() => {
            clearInterval(this.updater)
        })
        function autoUpdate() {
            this.updater = setInterval(() => this.update(), 1000);
        }
        function toggle() {
            this.end = !this.end;
        }
        function update() {
            this.elapsed = this.$formatDistance(this.operation.createdAt);

            this.remaining = this.operation.estimatedEnd
                && isAfter(new Date(this.operation.estimatedEnd), new Date())
                ? this.$formatDistance(this.operation.estimatedEnd)
                : null;
        }

    },
    render() {
        return this.$scopedSlots.default({
            elapsed: this.elapsed,
            end: this.end,
            events: {
                click: () => this.$emit('cancel', this.operation),
            },
            ioTypes: this.enums.ioTypes,
            operation: this.operation,
            remaining: this.remaining,
            toggle: this.toggle,
        });
    },
};
</script>
