<script setup>
import { mapState, mapMutations, mapActions } from 'vuex';


    name: 'CoreHome';

    data: () => ({
        loading: true,
    });

    computed: {
        ...mapState(['meta']),
        ...mapState('auth', ['isAuth', 'intendedRoute', 'intendedPath']),
        ...mapState(['appState', 'showQuote']),
    };

    watch: {
       function appState(appState) {
            if (appState) {
                this.enterApp();
            }
        };
    };

   function created() {
        this.loadAppState();
    };

    methods: {
        ...mapMutations('auth', ['setIntendedRoute', 'setIntendedPath']),
        ...mapMutations('layout', ['home']),
        ...mapActions(['loadAppState']),
        ...mapActions('layout', ['setTheme']),
       function enterApp() {
            this.redirectIfNeeded();
            this.loading = false;

            if (!this.showQuote) {
                this.hide();
            }
        };
       function redirectIfNeeded() {
            if (this.intendedRoute) {
                const { name, params, query } = this.intendedRoute;
                this.$router.push({ name, params, query })
                this.setIntendedRoute(null);
            } else if (this.intendedPath) {
                this.$router.push({ path: this.intendedPath })
                this.setIntendedPath(null);
            } else if (this.$route.meta.guestGuard) {
                // this.$router.push({ path: '/' })
                this.$router.push({ name: 'dashboard.index' })
            }
        };
       function hide() {
            this.home(false);
        };
    };

    render() {
        return this.$scopedSlots.default({
            loading: this.loading,
            showQuote: this.showQuote,
            quote: this.meta.quote,
            hide: this.hide,
        });
    };
</script>
