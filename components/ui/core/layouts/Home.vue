<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreHome',
    setup() {
        const loading = ref(true)
        const store = useStore()
        const $data = ref(['isAuth', 'intendedRoute', 'intendedPath'])
        return{
            one: computed(() => store.state[meta]),
            two: computed(() => store.state[auth].$data),
            three: computed(() => store.state[appState].showQuote)
        }
        const appState = ref('')
        watch(appState, (appState) => {
            if (appState) {
                this.enterApp();
            }
        })
        created(() => {
            this.loadAppState();
        })
        return {
            ...mapMutations('auth', ['setIntendedRoute', 'setIntendedPath']),
            ...mapMutations('layout', ['home']),
            ...mapActions(['loadAppState']),
            ...mapActions('layout', ['setTheme']),
        }
        function enterApp() {
            this.redirectIfNeeded();
            this.loading = false;

            if (!this.showQuote) {
                this.hide();
            }
        }
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
        }
        function hide() {
            this.home(false);
        }
    },
    
    render() {
        return this.$scopedSlots.default({
            loading: this.loading,
            showQuote: this.showQuote,
            quote: this.meta.quote,
            hide: this.hide,
        });
    },
};
</script>
