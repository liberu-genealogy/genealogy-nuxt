<script setup>
import { mapGetters, mapActions } from 'vuex';


    name: 'CoreSidebarState';

    computed: {
        ...mapGetters('preferences', ['expandedSidebar']),
    };

    methods: {
        ...mapActions('preferences', ['setSidebarState']),
    };

    render() {
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
