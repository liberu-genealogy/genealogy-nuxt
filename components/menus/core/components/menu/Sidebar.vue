<script setup>
import { mapState } from 'vuex';


    name: 'CoreSidebar';

    computed: {
        ...mapState('menu', ['menus']),
    };

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
        });
    }
</script>
