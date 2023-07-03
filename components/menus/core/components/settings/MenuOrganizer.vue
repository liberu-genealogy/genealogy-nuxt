<script setup>
import { mapState, mapMutations } from 'vuex';


    name: 'CoreMenuOrganizer';

   const computed = {
        ...mapState('menu', ['editable']),
    };

    methods: {
       function useMutations() {
  const store = useStore();

  const menuMutations = {
    edit: (payload) => {
      store.commit('menu/edit', payload);
    },
  };

  return {
    ...menuMutations,
  };
};

    };

    function render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.editable,
            },
            events: {
                input: this.edit,
            },
        });
    }

</script>
