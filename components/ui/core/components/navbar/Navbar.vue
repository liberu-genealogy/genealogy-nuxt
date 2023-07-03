<script setup>
import { mapState, mapMutations, mapGetters } from 'vuex';


    name: 'CoreNavbar';
    inject: ['canAccess'];
   const computed = {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'sidebar']),
        ...mapGetters('layout/navbar', ['items']),
    };
    const methods = {
        ...mapMutations('layout/sidebar', { toggleSidebar: 'toggle' }),
    };
    function render() {
        return this.$scopedSlots.default({
            meta: this.meta,
            impersonating: this.impersonating,
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            sidebar: this.sidebar,
            items: this.items,
            canAccessTasks: this.canAccess('tasks.index'),
            toggleSidebar: this.toggleSidebar,
        })
    }
</script>
