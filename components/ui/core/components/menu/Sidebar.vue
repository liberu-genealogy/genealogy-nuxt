<script setup>
import { mapState } from 'vuex';


    name: 'CoreSidebar';

   const computed = {
        ...mapState('menu', ['menus']),
    };

    function render() {
        return this.$scopedSlots.default({
            menus: this.menus,
        });
    };
</script>
