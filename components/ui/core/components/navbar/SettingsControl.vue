<script>
import { mapMutations } from 'vuex';

export default {
    name: 'CoreSettingsControl',

    methods: {
        ...mapMutations('layout/settings', ['toggle']),
    },

    render() {
        return this.$scopedSlots.default({
            toggle: this.toggle,
        });
    },
};
</script>
