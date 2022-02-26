<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreIO',

    inject: ['route', 'errorHandler', 'toastr'],
    setup() {
        const imports = ref([])
        const exports = ref([])
        const store = useStore()
        return {
            one: computed(() => store.getters['${websockets}/channels']),
            two: computed(() => store.state[user].meta.enums)
        }
        const count = computed(() => {
            return this.imports.length + this.exports.length;
        })
        created(() => {
            this.connect();
            this.listen();
        })
        return {
            ...mapActions('websockets', ['connect'])
        }
        function cancel(operation) {
            const type = this.enums.ioTypes._get(operation.type);

            this.$axios.patch(this.route(`${type}.cancel`, { [type]: operation.id }))
                .then(({ data: { message } }) => this.toastr.warning(message))
                .catch(this.errorHandler);
        }
        function listen() {
            window.Echo.private(this.channels.io)
                .listen('.import', ({ operation }) => this.process(operation))
                .listen('.export', ({ operation }) => this.process(operation));
        }
        function process(operation) {
            switch (`${operation.status}`) {
                case this.enums.ioStatuses.Started:
                    this.push(operation);
                    break;
                case this.enums.ioStatuses.Stopped:
                    this.remove(operation);
                    break;
                default:
                    this.update(operation);
                    break;
            }
        }
        function push(operation) {
            const index = this.index(operation);

            if (index === -1) {
                this.bag(operation.type).push(operation);
            }
        }
        function update(operation) {
            const index = this.index(operation);

            if (index !== -1) {
                this.bag(operation.type).splice(index, 1, operation);
            } else {
                this.push(operation);
            }
        }
        function remove(operation) {
            const index = this.index(operation);

            if (index >= 0) {
                this.bag(operation.type).splice(index, 1);
            }
        }
        function index(operation) {
            return this.bag(operation.type)
                .findIndex(({ id }) => id === operation.id);
        }
        function bag(type) {
            return this[this.type(type)];
        }
        function type(type) {
            switch (this.enums.ioTypes._get(type)) {
                case 'import':
                    return 'imports';
                case 'export':
                    return 'exports';
                default:
                    throw Error(`Unknown io type: ${this.enums.ioTypes._get(type)}`)
            }
        }

    },

    render() {
        return this.$scopedSlots.default({
            count: this.count,
            events: { cancel: this.cancel },
            exports: this.exports,
            imports: this.imports,
        });
    },
};
</script>
