<script setup>
import { computed, useStore } from 'vuex';


    name: 'CoreKeyCollector';

    data: () => ({
        collect: false,
    });

    computed: mapState(['meta']);

    methods: {
       function useMutations() {
  const store = useStore();

  const setKeyCollector = (value) => {
    store.commit('localisation/setKeyCollector', value);
  };

  return {
    setKeyCollector,
  };
};
    };

    render() {
        return this.$scopedSlots.default({
            isLocal: this.meta.env === 'local',
            bindings: {
                value: this.collect,
            },
            events: {
                input: state => {
                    this.collect = state;
                    this.setKeyCollector(state);
                },
            },
        });
    };


</script>
