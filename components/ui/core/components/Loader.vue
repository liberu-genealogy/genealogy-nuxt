<script setup>

    name: 'CoreLoader';

    data: () => ({
        visible: false,
        startsAt: 10,
        latency: 200,
        routing: false,
        sent: 0,
        received: 0,
        timer: null,
    });

    computed: {
       function progress() {
            return this.sent
                ? Math.min(this.startsAt + (this.received / this.sent) * 90, 100)
                : 0;
        };
       function shouldStop() {
            return this.received >= this.sent;
        };
    };

    watch: {
        $route: 'handleRouting',
    };

   function created() {
        this.setInterceptors();
    };

    methods: {
       function reset() {
            this.visible = false;
            this.sent = 0;
            this.received = 0;
        };
       function update() {
            if (this.shouldStop) {
                clearTimeout(this.timer);
                this.timer = setTimeout(this.reset, this.latency * 1.5);
            }
        };
       function handleRouting() {
            clearTimeout(this.routing);
            this.reset();

            this.incSent();
            this.routing = setTimeout(this.incReceived, this.latency * 2);
        };
       function incSent(inc = 1) {
            this.visible = true;
            setTimeout(() => (this.sent += inc), 1);
        };
       function incReceived(inc = 1) {
            setTimeout(() => {
                this.received += inc;
                this.update();
            }, this.latency);
        };
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
        };
    };

    render() {
        return this.$scopedSlots.default({
            visible: this.visible,
            progress: this.progress,
        });
    };
</script>
