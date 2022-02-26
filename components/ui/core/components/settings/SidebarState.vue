<script>
import { mapGetters, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreSidebarState',
    setup() {
        const store = useStore()
        return{
            one: computed(() => store.getters['${preferences}/expandedSidebar'])
        }
        return {
            ...mapActions('preferences', ['setSidebarState']),
        }
    },
    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.expandedSidebar,
            },
            events: {
                input: state => (this.setSidebarState(state)),
            },
        });
    },
};

</script>
