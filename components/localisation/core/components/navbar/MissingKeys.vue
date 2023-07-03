<script setup>
import { computed, useStore } from 'vuex';


    name: 'CoreMissingKeys';

    inject: ['errorHandler', 'route', 'toastr'];

    data: () => ({
        hover: false,
    });

    computed: {
      function useComputedValues() {
  const store = useStore();

  const keyCollector = computed(() => {
    return store.state.localisation.keyCollector;
  });

  const missingKeys = computed(() => {
    return store.state.localisation.missingKeys;
  });

  const isTouch = computed(() => {
    return store.state.layout.isTouch;
  });

  return {
    keyCollector,
    missingKeys,
    isTouch,
  };
};

       function count() {
            return this.missingKeys.length;
        };
       function mappedKeys() {
            return this.missingKeys
                .map(key => ({ [key]: null }));
        };
    };

    methods: {
        function useMutations() {
  const store = useStore();

  const addKey = (key) => {
    store.commit('localisation/addKey', key);
  };

  const clearMissingKeys = () => {
    store.commit('localisation/clearMissingKeys');
  };

  return {
    addKey,
    clearMissingKeys,
  };
};
       function persist() {
            this.$axios.patch(
                this.route('system.localisation.addKey'),
                { keys: this.missingKeys },
            ).then(({ data }) => {
                this.missingKeys.forEach(key => this.addKey(key));
                this.clearMissingKeys();
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        };
    };

    function render() {
        return this.$scopedSlots.default({
            keyCollector: this.keyCollector,
            isTouch: this.isTouch,
            hover: this.hover,
            count: this.count,
            events: {
                click: this.persist,
                mouseenter: () => (this.hover = true),
                mouseleave: () => (this.hover = false),
            },
        });
    };

</script>
