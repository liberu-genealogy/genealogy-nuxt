<script>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';

export default {
    name: 'CoreDefault',

    inject: ['errorHandler', 'route', 'toastr'],

    computed: {
        ...mapState(['meta', 'appState']),
        ...mapState('layout', ['lightsOff', 'isTablet', 'isMobile', 'sidebar', 'settings', 'footer']),
        ...mapGetters('preferences', ['bookmarks']),
        ...mapGetters('localisation', ['rtl']),
        slideIn() {
            return this.rtl ? 'slideInLeft' : 'slideInRight';
        },
        slideOut() {
            return this.rtl ? 'slideOutLeft' : 'slideOutRight';
        },
    },

    watch: {
        isTablet: {
            handler() {
                return this.isTablet
                    ? this.hideSidebar()
                    : this.showSidebar();
            },
        },
    },

    created() {
        this.$root.$on('start-impersonating', this.startImpersonating);
        this.$root.$on('stop-impersonating', this.stopImpersonating);
    },

    beforeMount() {
        this.addTouchBreakpointsListeners();
    },

    methods: {
        ...mapMutations('layout', ['setIsTablet', 'setIsMobile', 'setIsTouch']),
        ...mapMutations('layout/sidebar', { showSidebar: 'show', hideSidebar: 'hide' }),
        ...mapActions(['loadAppState']),
        addTouchBreakpointsListeners() {
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
        },
        startImpersonating(id) {
            this.$axios.get(this.route('core.impersonate.start', id))
                .then(({ data }) => {
                    this.toastr.warning(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        },
        stopImpersonating() {
            this.$axios.get(this.route('core.impersonate.stop'))
                .then(({ data }) => {
                    this.toastr.info(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        },
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
