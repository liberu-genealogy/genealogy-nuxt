<script>
import { computed, useStore } from 'vuex';


    name: 'CoreIO';

    inject: ['route', 'errorHandler', 'toastr'];

    data: () => ({
        imports: [],
        exports: [],
    });

    computed: {
       function useComputedValues() {
  const store = useStore();

  const channels = computed(() => {
    return store.getters['websockets/channels'];
  });

  const user = computed(() => {
    return store.state.user;
  });

  const meta = computed(() => {
    return store.state.meta;
  });

  const enums = computed(() => {
    return store.state.enums;
  });

  return {
    channels,
    user,
    meta,
    enums,
  };
};

       function count() {
            return this.imports.length + this.exports.length;
        };
    };

    function created() {
        this.connect();
        this.listen();
    };

    methods: {
       function useActions() {
  const store = useStore();

  const connect = () => {
    store.dispatch('websockets/connect');
  };

  return {
    connect,
  };
};
       function cancel(operation) {
            const type = this.enums.ioTypes._get(operation.type);

            this.$axios.patch(this.route(`${type}.cancel`, { [type]: operation.id }))
                .then(({ data: { message } }) => this.toastr.warning(message))
                .catch(this.errorHandler);
        };
       function listen() {
            window.Echo.private(this.channels.io)
                .listen('.import', ({ operation }) => this.process(operation))
                .listen('.export', ({ operation }) => this.process(operation));
        };
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
        };
       function push(operation) {
            const index = this.index(operation);

            if (index === -1) {
                this.bag(operation.type).push(operation);
            }
        };
       function update(operation) {
            const index = this.index(operation);

            if (index !== -1) {
                this.bag(operation.type).splice(index, 1, operation);
            } else {
                this.push(operation);
            }

        };
       function remove(operation) {
            const index = this.index(operation);

            if (index >= 0) {
                this.bag(operation.type).splice(index, 1);
            }
        };
       function index(operation) {
            return this.bag(operation.type)
                .findIndex(({ id }) => id === operation.id);
        };
       function bag(type) {
            return this[this.type(type)];
        };
       function type(type) {
            switch (this.enums.ioTypes._get(type)) {
                case 'import':
                    return 'imports';
                case 'export':
                    return 'exports';
                default:
                    throw Error(`Unknown io type: ${this.enums.ioTypes._get(type)}`)
            }
        };
    };

    render() {
        return this.$scopedSlots.default({
            count: this.count,
            events: { cancel: this.cancel },
            exports: this.exports,
            imports: this.imports,
        });
    },

</script>
