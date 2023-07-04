<script setup>
import {
    useStore
} from 'vuex';


    name: 'CoreMenuItem';

    inject: ['routerErrorHandler'];

    props: {
        menu: {
            type: Object;
            required: true;
        };
    };

    computed: {
       function useStateGetters() {
  const store = useStore();

  const menuState = computed(() => {
    return store.state.menu.editable;
  });

  const layoutState = computed(() => {
    return store.state.layout.isTouch;
  });

  const sidebarState = computed(() => {
    return store.state.layout.sidebar.isExpanded;
  });

  const menuGetters = {
    hasActiveChild: computed(() => {
      return store.getters['menu/hasActiveChild'];
    }),
  };

  return {
    editable: menuState,
    isTouch: layoutState,
    isExpanded: sidebarState,
    ...menuGetters,
  };
};

        function active() {
            return this.menu.route !== null
                && (this.matchesName || this.matchesPath);
        };
       function matchesName() {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.name)
                .includes(this.menu.route);
        };
       function matchesPath() {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.path)
                .includes(this.path);
        };
       function path() {
            return `/${this.menu.route.split('.').slice(0, -1).join('/')}`;
        };
    };

  const watch = {
        active: {
            handler(active) {
                this.activate({ menu: this.menu, active });

                if (active) {
                    this.$nextTick(this.refresh);
                }
            },
            immediate: true,
        }
    };

    methods: {
      function useMutationsActions() {
  const store = useStore();

  const layoutSidebarMutations = {
    hide: () => {
      store.commit('layout/sidebar/hide');
    },
  };

  const menuMutations = {
    activate: (payload) => {
      store.commit('menu/activate', payload);
    },
    toggle: () => {
      store.commit('menu/toggle');
    },
  };

  const menuActions = {
    refresh: () => {
      store.dispatch('menu/refresh');
    },
  };

  return {
    ...layoutSidebarMutations,
    ...menuMutations,
    ...menuActions,
  };
}

       function select() {
            if (this.menu.children) {
                this.toggle(this.menu);

                return;
            }

            this.$router.push({ name: this.menu.route })

            if (this.isTouch) {
                this.hide();
            }
        };
    };

    function render() {
        return this.$scopedSlots.default({
            menu: this.menu,
            editable: this.editable,
            expandedSidebar: this.isExpanded,
            hasActiveChild: this.menu.children && this.hasActiveChild(this.menu),
            menuEvents: {
                click: this.select,
            },
        })
    };
</script>
