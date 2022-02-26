<script>
import { ref, computed, useStore, watch} from 'vue';
export default {
    name: 'CoreLoader',
    setup() {
        const visible = ref(false)
        const startsAt = ref(10)
        const latency = ref(200)
        const routing = ref(false)
        const sent = ref(0)
        const received = ref(0)
        const timer = ref(null)
        const progress = computed(() => {
            return this.sent
                ? Math.min(this.startsAt + (this.received / this.sent) * 90, 100)
                : 0;
        })
        const shouldStop = computed(() => {
            return this.received >= this.sent;
        })
        watch(() => {
            const $route = ref('handleRouting')
        })
        created(() => {
            this.setInterceptors()
        })
        function reset() {
            this.visible = false;
            this.sent = 0;
            this.received = 0;
        }
        function update() {
            if (this.shouldStop) {
                clearTimeout(this.timer);
                this.timer = setTimeout(this.reset, this.latency * 1.5);
            }
        }
        function handleRouting() {
            clearTimeout(this.routing);
            this.reset();

            this.incSent();
            this.routing = setTimeout(this.incReceived, this.latency * 2);
        } 
        function incSent (inc = 1) {
            this.visible = true;
            setTimeout(() => (this.sent += inc), 1);
        }
        function incReceived(inc = 1) {
            setTimeout(() => {
                this.received += inc;
                this.update();
            }, this.latency);
        }
        function setInterceptors() {
            this.$axios.interceptors.request.use(config => {
                this.incSent();
                return config;
            });

            this.$axios.interceptors.response.use(response => {
                this.incReceived();
                return response;
            }, error => {
                this.incReceived();
                return Promise.reject(error);
            });
        }

    },
    
    render() {
        return this.$scopedSlots.default({
            visible: this.visible,
            progress: this.progress,
        });
    },
};
</script>
