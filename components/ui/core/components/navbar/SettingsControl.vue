<script setup>
import { mapMutations } from 'vuex';


    name: 'CoreSettingsControl';

   const methods = {
        ...mapMutations('layout/settings', ['toggle']),
    };

    function render() {
        return this.$scopedSlots.default({
            toggle: this.toggle,
        });
    };
</script>
