<script>
import { debounce } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'Tasks',

    inject: ['errorHandler', 'route', 'routerErrorHandler', 'toastr'],

    props: {
        paginate: {
            type: Number,
            default: 200,
        },
    },
    setup() {
        const echo = ref(null)
        const loading = ref(false)
        const offset = ref(0)
        const overdue = ref(0)
        const pending = ref(0)
        const tasks = ref([])
        const store = useStore()
        return {
            one: computed(() => store.getters['${websockets}/channels']),
            two: computed(() => store.state[layout].isTouch),
            three: computed(() => store.state[enums].meta)
        }
        created(() => {
            this.fetch = debounce(this.fetch, 500);
            this.count();
            this.connect();
            this.listen();
        })
        return{
            ...mapActions('websockets', ['connect']),
        }
        function computeScrollPosition(event) {
            const a = event.target.scrollTop;
            const b = event.target.scrollHeight - event.target.clientHeight;

            if (a / b > 0.7) {
                this.fetch();
            }
        }
        function count() {
            this.$axios.get(this.route('tasks.count'))
                .then(({ data }) => this.updateCounters(data))
                .catch(this.errorHandler);
        }
        function dateTime(dateTime) {
            return this.$format(dateTime, `${this.meta.dateFormat} H:i`);
        }
        function flagClass(id) {
            return `has-text-${this.enums.flags._get(id).toLowerCase()}`;
        }
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
        }
        function listen() {
            window.Echo.private(this.channels.task)
                .listen('.updated', data => {
                    this.offset = 0;
                    this.tasks = [];
                    this.updateCounters(data);
                });
        }
        function updateCounters({ overdueCount, pendingCount }) {
            this.overdue = overdueCount;
            this.pending = pendingCount;
        }
        function visitTask({ id }) {
            this.$router.push({ name: 'tasks.edit', params: { task: id } })
                .catch(this.routerErrorHandler);
        }
        function visitTasks() {
            this.$router.push({ name: 'tasks.index' })
                .catch(this.routerErrorHandler);
        }
    },

    render() {
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
    },
};
</script>
