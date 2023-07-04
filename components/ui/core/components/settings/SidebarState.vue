<script setup>
import { mapGetters, mapActions } from 'vuex';


    name: 'CoreSidebarState';

   const computed = {
        ...mapGetters('preferences', ['expandedSidebar']),
    };

   const methods = {
        ...mapActions('preferences', ['setSidebarState']),
    };

    function render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.expandedSidebar,
            },
            events: {
                input: state => (this.setSidebarState(state)),
            },
        });
    };
</script>
