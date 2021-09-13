<script>
import { mapState } from 'vuex';

export default {
    name: 'CoreSidebar',

    computed: {
        ...mapState('menu', ['menus']),
    },

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
        });
    },
};
</script>
