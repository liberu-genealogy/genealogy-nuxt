<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CoreSidebarState',

    computed: {
        ...mapGetters('preferences', ['expandedSidebar']),
    },

    methods: {
        ...mapActions('preferences', ['setSidebarState']),
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
