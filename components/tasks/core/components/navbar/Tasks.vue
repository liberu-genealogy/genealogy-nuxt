<script setup>
import { debounce } from 'lodash';
import { computed, useStore } from 'vuex';


    name: 'Tasks';

    inject: ['errorHandler', 'route', 'routerErrorHandler', 'toastr'];

    props: {
        paginate: {
            type: Number;
            defaultValue: 200;
        };
    };

    data: () => ({
        echo: null,
        loading: false,
        offset: 0,
        overdue: 0,
        pending: 0,
        tasks: [],
    });

    computed: {
        function useComputedValues() {
  const store = useStore();

  const channels = computed(() => {
    return store.getters['websockets/channels'];
  });

  const isTouch = computed(() => {
    return store.state.layout.isTouch;
  });

  const enums = computed(() => {
    return store.state.enums;
  });

  const meta = computed(() => {
    return store.state.meta;
  });

  return {
    channels,
    isTouch,
    enums,
    meta,
  };
};

    };

   function created() {
        this.fetch = debounce(this.fetch, 500);
        this.count();
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
       function computeScrollPosition(event) {
            const a = event.target.scrollTop;
            const b = event.target.scrollHeight - event.target.clientHeight;

            if (a / b > 0.7) {
                this.fetch();
            }
        };
       function count() {
            this.$axios.get(this.route('tasks.count'))
                .then(({ data }) => this.updateCounters(data))
                .catch(this.errorHandler);
        };
       function dateTime(dateTime) {
            return this.$format(dateTime, `${this.meta.dateFormat} H:i`);
        };
       function flagClass(id) {
            // eslint-disable-next-line no-underscore-dangle
            return `has-text-${this.enums.flags._get(id).toLowerCase()}`;
        };
       function fetch() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            this.$axios.get(this.route('tasks.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.tasks = this.offset ? this.tasks.concat(data) : data;
                this.offset = this.tasks.length;
                this.loading = false;
            }).catch(this.errorHandler);
        };
       function listen() {
            window.Echo.private(this.channels.task)
                .listen('.updated', data => {
                    this.offset = 0;
                    this.tasks = [];
                    this.updateCounters(data);
                });
        };
       function updateCounters({ overdueCount, pendingCount }) {
            this.overdue = overdueCount;
            this.pending = pendingCount;
        };
       function visitTask({ id }) {
            this.$router.push({ name: 'tasks.edit', params: { task: id } })
                .catch(this.routerErrorHandler);
        };
       function visitTasks() {
            this.$router.push({ name: 'tasks.index' })
                .catch(this.routerErrorHandler);
        };
    };

    function render() {
        return this.$scopedSlots.default({
            dateTime: this.dateTime,
            events: {
                scroll: e => this.computeScrollPosition(e),
            },
            fetch: this.fetch,
            flagClass: this.flagClass,
            loading: this.loading,
            overdue: this.overdue,
            pending: this.pending,
            tasks: this.tasks,
            visitTask: this.visitTask,
            visitTasks: this.visitTasks,
        });
    }
</script>
