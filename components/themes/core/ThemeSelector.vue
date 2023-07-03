<script setup>
import { useStore } from 'vuex';


    name: 'CoreThemeSelector';

    computed: {
      function useStateGetters() {
  const store = useStore();

  const layoutState = computed(() => {
    return store.state.layout.themes;
  });

  const preferencesGetters = {
    theme: computed(() => {
      return store.getters['preferences/theme'];
    }),
  };

  const localisationGetters = {
    rtl: computed(() => {
      return store.getters['localisation/rtl'];
    }),
  };

  return {
    themes: layoutState,
    ...preferencesGetters,
    ...localisationGetters,
  };
}

       function alternate() {
            return Object.keys(this.themes)
                .find(theme => theme.replace('-rtl', '') !== this.theme.replace('-rtl', '')) + (this.rtl ? '-rtl' : '');
        };
       function multiTheme() {
            return Object.keys(this.themes).length > 1;
        };
    };

    methods: {
    function useActions() {
  const store = useStore();

  const preferencesActions = {
    setTheme: (payload) => {
      return store.dispatch('preferences/setTheme', payload);
    },
  };

  return {
    ...preferencesActions,
  };
}

    };

    function render() {
        return this.$scopedSlots.default({
            multiTheme: this.multiTheme,
            itemEvents: {
                click: () => this.setTheme(this.alternate),
            },
        });
    }

</script>
