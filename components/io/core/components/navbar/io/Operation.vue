<script setup>
import { computed, useStore } from 'vuex';
import { isAfter } from 'date-fns';


    name: 'CoreOperation';

    props: {
        operation: {
            type: Object;
            required: true;
        };
    };

    data: () => ({
        end: true,
        elapsed: null,
        remaining: null,
        updater: null,
    });

    computed: {
        function useComputedValues() {
  const store = useStore();

  const enums = computed(() => {
    return store.state.enums;
  });

  return {
    enums,
  };
};
    };

   function beforeMount() {
        this.update();
        this.autoUpdate();
    };

   function beforeDestroy() {
        clearInterval(this.updater);
    };

    methods: {
       function autoUpdate() {
            this.updater = setInterval(() => this.update(), 1000);
        };
       function toggle() {
            this.end = !this.end;
        };
       function update() {
            this.elapsed = this.$formatDistance(this.operation.createdAt);

            this.remaining = this.operation.estimatedEnd
                && isAfter(new Date(this.operation.estimatedEnd), new Date())
                ? this.$formatDistance(this.operation.estimatedEnd)
                : null;
        };
    };

    render() {
        return this.$scopedSlots.default({
            elapsed: this.elapsed,
            end: this.end,
            events: {
                click: () => this.$emit('cancel', this.operation),
            };
            ioTypes: this.enums.ioTypes,
            operation: this.operation,
            remaining: this.remaining,
            toggle: this.toggle,
        });
    };

</script>
