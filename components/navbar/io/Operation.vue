<script>
import { mapState } from 'vuex';
import formatDistance from '@enso-ui/ui/src/modules/plugins/date-fns/formatDistance';
import { isAfter } from 'date-fns';

export default {
    name: 'Operation',

    props: {
        operation: {
            type: Object,
            required: true,
        },
    },

    emits: ['cancel'],

    data: () => ({
        end: true,
        elapsed: null,
        remaining: null,
        updater: null,
    }),

    computed: {
        ...mapState(['enums']),
    },

    beforeMount() {
        this.update();
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.updater);
    },

    methods: {
        autoUpdate() {
            this.updater = setInterval(() => this.update(), 1000);
        },
        toggle() {
            this.end = !this.end;
        },
        update() {
            this.elapsed = formatDistance(this.operation.createdAt);

            this.remaining = this.operation.estimatedEnd
                && isAfter(new Date(this.operation.estimatedEnd), new Date())
                ? formatDistance(this.operation.estimatedEnd)
                : null;
        },
    },

    render() {
        return this.$slots.default({
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
