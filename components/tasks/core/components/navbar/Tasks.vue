<script>
import { debounce } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';

export default {
    name: 'Tasks',

    inject: ['errorHandler', 'http', 'route', 'routerErrorHandler', 'toastr'],

    props: {
        paginate: {
            type: Number,
            default: 200,
        },
    },

    data: () => ({
        echo: null,
        loading: false,
        offset: 0,
        overdue: 0,
        pending: 0,
        tasks: [],
    }),

    computed: {
        ...mapGetters('websockets', ['channels']),
        ...mapState('layout', ['isTouch']),
        ...mapState(['enums', 'meta']),
    },

    created() {
        this.fetch = debounce(this.fetch, 500);
        this.count();
        this.listen();
    },

    methods: {
        computeScrollPosition(event) {
            const a = event.target.scrollTop;
            const b = event.target.scrollHeight - event.target.clientHeight;

            if (a / b > 0.7) {
                this.fetch();
            }
        },
        count() {
            this.http.get(this.route('tasks.count'))
                .then(({ data }) => this.updateCounters(data))
                .catch(this.errorHandler);
        },
        dateTime(dateTime) {
            return format(dateTime, `${this.meta.dateFormat} H:i`);
        },
        flagClass(id) {
            // eslint-disable-next-line no-underscore-dangle
            return `has-text-${this.enums.flags._get(id).toLowerCase()}`;
        },
        fetch() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            this.http.get(this.route('tasks.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.tasks = this.offset ? this.tasks.concat(data) : data;
                this.offset = this.tasks.length;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        listen() {
            window.Echo.private(this.channels.task)
                .listen('.updated', data => {
                    this.offset = 0;
                    this.tasks = [];
                    this.updateCounters(data);
                });
        },
        updateCounters({ overdueCount, pendingCount }) {
            this.overdue = overdueCount;
            this.pending = pendingCount;
        },
        visitTask({ id }) {
            this.$router.push({ name: 'tasks.edit', params: { task: id } })
                .catch(this.routerErrorHandler);
        },
        visitTasks() {
            this.$router.push({ name: 'tasks.index' })
                .catch(this.routerErrorHandler);
        },
    },

    render() {
        return this.$slots.default({
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
    },
};
</script>
