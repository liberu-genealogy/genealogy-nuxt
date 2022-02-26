<script>
import { mapState, mapGetters } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreSettings',
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[user]),
            two: computed(() => store.state[meta]),
            three: computed(() => store.state[layout].themes),
            four: computed(() => store.getters["${layout/settings}/items"]),
            five: computed(() => store.state[localisation].languages)
        }
        const multiTheme = computed(() => {
            return Object.keys(this.themes).length > 1;
        })
    },

    render() {
        return this.$scopedSlots.default({
            multiTheme: this.multiTheme,
            meta: this.meta,
            items: this.items,
        });
    },
};
</script>
