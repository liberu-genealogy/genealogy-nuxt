<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import canAccess from '~/mixins/canAccess';
import errorHandler from '~/mixins/errorHandler';
import routerErrorHandler from '~/mixins/routerErrorHandler';
import RouteMapper from '@enso-ui/route-mapper';
import toastr from '@enso-ui/toastr';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreApp',

    mixins: [canAccess, errorHandler, routerErrorHandler],
    setup() {
        const routeMapper = ref(null)
        const toastr = ref('')
        const store = useStore()
        return {
            one: computed(() => store.state[meta].routes),
            two: computed(() => store.state[auth].isAuth),
            three: computed(() => store.state[layout].home),
            four: computed(() => store.getters['${localisation}/rtl']),
        }
        const routes = ref('')
        watch(routes, (handler) => {
            this.routeMapper = new RouteMapper(this.meta.appUrl, this.routes);
            const immediate = ref(true)
            const deep = ref(true)
        })
        created(() => {
            this.loadTheme();
        })
        return {
            ...mapActions('layout', ['loadTheme']),
        }
        function i18n(key, params = null) {
            return this.$i18n(key, params);
        }
        function route(name, params, absolute) {
            return this.routeMapper.get(name, params, absolute);
        }
    },

    provide() {
        return {
            canAccess: this.canAccess,
            errorHandler: this.errorHandler,
            i18n: this.i18n,
            route: this.route,
            routerErrorHandler: this.routerErrorHandler,
            toastr: this.toastr,
        };
    },

    render() {
        return this.$scopedSlots.default({
            isAuth: this.isAuth,
            home: this.home,
            direction: this.rtl ? 'rtl' : 'ltr',
        });
    },
};
</script>
