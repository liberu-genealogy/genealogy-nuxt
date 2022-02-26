<script>
import { mapMutations } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreSettingsControl',
    setup() {
        return {
            ...mapMutations('layout/settings', ['toggle']),
        }
    },

    render() {
        return this.$scopedSlots.default({
            toggle: this.toggle,
        });
    },
};
</script>
