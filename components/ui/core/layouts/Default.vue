<script>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import { ref, computed, useStore, watch, onBeforeMount } from 'vue';

export default {
    name: 'CoreDefault',

    inject: ['errorHandler', 'route', 'toastr'],
    setup() {
        const store = useStore()
        const $data = ref(['lightsOff', 'isTablet', 'isMobile', 'sidebar', 'settings', 'footer'])
        return {
            one: computed(() => store.state[meta].appState),
            two: computed(() => store.state[layout].$data),
            three: computed(() => store.getters['${preferences}/bookmarks']),
            four: computed(() => store.getters['${localisation}/rtl'])
        }
        const slideIn = computed(() => {
            return this.rtl ? 'slideInLeft' : 'slideInRight';
        })
        const slideOut = computed(() => {
            return this.rtl ? 'slideOutLeft' : 'slideOutRight';
        })
        const isTablet = ref('')
        watch(isTablet, (handler) => {
                return this.isTablet
                    ? this.hideSidebar()
                    : this.showSidebar()
        })
        created(() => {
            this.$root.$on('start-impersonating', this.startImpersonating);
            this.$root.$on('stop-impersonating', this.stopImpersonating);
        })
        onBeforeMount(() => {
            this.addTouchBreakpointsListeners();
        })
        return {
            ...mapMutations('layout', ['setIsTablet', 'setIsMobile', 'setIsTouch']),
            ...mapMutations('layout/sidebar', { showSidebar: 'show', hideSidebar: 'hide' }),
            ...mapActions(['loadAppState']),
        }
        function addTouchBreakpointsListeners() {
            const { body } = document;
            const TabletMaxWidth = 1023;
            const MobileMaxWidth = 768;

            const handler = () => {
                if (!document.hidden) {
                    const rect = body.getBoundingClientRect();
                    this.setIsTablet(rect.width <= TabletMaxWidth);
                    this.setIsMobile(rect.width <= MobileMaxWidth);
                    this.setIsTouch(
                        rect.width <= TabletMaxWidth || rect.width <= MobileMaxWidth,
                    );
                }
            };

            document.addEventListener('visibilitychange', handler);
            window.addEventListener('DOMContentLoaded', handler);
            window.addEventListener('resize', handler);

            this.$once('hook:destroyed', () => {
                document.removeEventListener('visibilitychange', handler);
                window.removeEventListener('DOMContentLoaded', handler);
                window.removeEventListener('resize', handler);
            });

            handler();
        }
        function startImpersonating(id) {
            this.$axios.get(this.route('core.impersonate.start', id))
                .then(({ data }) => {
                    this.toastr.warning(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        }
        function stopImpersonating() {
            this.$axios.get(this.route('core.impersonate.stop'))
                .then(({ data }) => {
                    this.toastr.info(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        }
    },
    
    render() {
        return this.$scopedSlots.default({
            appState: this.appState,
            lightsOff: this.lightsOff,
            sidebar: this.sidebar,
            rtl: this.rtl,
            slideIn: this.slideIn,
            slideOut: this.slideOut,
            settings: this.settings,
            bookmarks: this.bookmarks,
            footer: this.footer,
        });
    },
};
</script>
