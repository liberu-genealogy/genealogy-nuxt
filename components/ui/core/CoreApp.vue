<script setup>
import { mapState, mapActions, mapGetters } from 'vuex';
import canAccess from '~/mixins/canAccess';
import errorHandler from '~/mixins/errorHandler';
import routerErrorHandler from '~/mixins/routerErrorHandler';
import RouteMapper from '@enso-ui/route-mapper';
import toastr from '@enso-ui/toastr';


    name: 'CoreApp';

    mixins: [canAccess, errorHandler, routerErrorHandler];

    data: () => ({
        routeMapper: null,
        toastr,
    });

   const computed = {
        ...mapState(['meta', 'routes']),
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['home']),
        ...mapGetters('localisation', ['rtl']),
    };

    watch: {
        routes: {
           function handler() {
                this.routeMapper = new RouteMapper(this.meta.appUrl, this.routes);
            };
            immediate: true;
            deep: true;
        };
    };

   function created() {
        this.loadTheme();
    };

    methods: {
         function useActions() {
  const store = useStore();

  const layoutActions = {
    loadTheme: (payload) => {
      return store.dispatch('layout/loadTheme', payload);
    },
  };

  return {
    ...layoutActions,
  };
}
       function i18n(key, params = null) {
            return this.$i18n(key, params);
        };
       function route(name, params, absolute) {
            return this.routeMapper.get(name, params, absolute);
        };
    };

   function provide() {
        return {
            canAccess: this.canAccess,
            errorHandler: this.errorHandler,
            i18n: this.i18n,
            route: this.route,
            routerErrorHandler: this.routerErrorHandler,
            toastr: this.toastr,
        };
    };

    function render() {
        return this.$scopedSlots.default({
            isAuth: this.isAuth,
            home: this.home,
            direction: this.rtl ? 'rtl' : 'ltr',
        })
    };
</script>
