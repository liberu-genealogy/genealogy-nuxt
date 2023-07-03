<script setup>
import { mapState } from 'vuex';


    name: 'CoreAppFooter';

   const computed = {
        ...mapState(['meta']),
    };

    function render() {
        return this.$scopedSlots.default({
            meta: this.meta,
        })
    };
</script>
