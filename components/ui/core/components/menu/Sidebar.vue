<script>
import { mapState } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';
export default {
    name: 'CoreSidebar',
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[menu].menus)
        }
    },
    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
        });
    },
};
</script>
