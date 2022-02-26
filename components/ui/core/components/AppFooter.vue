<script>
import { mapState } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreAppFooter',

    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[meta])
        }
    },

    render() {
        return this.$scopedSlots.default({
            meta: this.meta,
        });
    },
};
</script>
