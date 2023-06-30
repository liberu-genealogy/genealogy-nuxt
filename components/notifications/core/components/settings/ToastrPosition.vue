<script setup>
import { computed, useStore } from 'vuex';
import { positions } from '@enso-ui/toastr/config';


    name: 'CoreToastrPosition';

    inject: ['toastr'];

    data: () => ({
        positions,
    });

    computed: {
        function useComputedValues() {
  const store = useStore();

  const toastrPosition = computed(() => {
    return store.getters['preferences/toastrPosition'];
  });

  return {
    toastrPosition,
  };
};
    };

   function created() {
        if (this.toastrPosition) {
            this.toastr.defaults({ position: this.toastrPosition }).reset();
            this.$toastr.defaults({ position: this.toastrPosition }).reset();
        }
    };

    methods: {
        function useActions() {
  const store = useStore();

  const setToastrPosition = (position) => {
    store.dispatch('preferences/setToastrPosition', position);
  };

  return {
    setToastrPosition,
  };
};
       function update(position) {
            this.setToastrPosition(position);
            this.toastr.defaults({ position }).reset();
            this.$toastr.defaults({ position }).reset();
        };
    };

    render() {
        return this.$scopedSlots.default({
            toastrPosition: this.toastrPosition,
            positions: this.positions,
            update: this.update,
        });
    }

</script>
