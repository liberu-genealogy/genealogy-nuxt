<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreNavbar',
    inject: ['canAccess'],
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[meta].impersonating),
            two: computed(() => store.state[layout].isMobile.isTouch.sidebar),
            three: computed(() => store.getters['${layout/navbar}/items'])
        }
        return{
            ...mapMutations('layout/sidebar', { toggleSidebar: 'toggle' }),
        }
    },
    render() {
        return this.$scopedSlots.default({
            meta: this.meta,
            impersonating: this.impersonating,
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            sidebar: this.sidebar,
            items: this.items,
            canAccessTasks: this.canAccess('tasks.index'),
            toggleSidebar: this.toggleSidebar,
        });
    },
};
</script>
