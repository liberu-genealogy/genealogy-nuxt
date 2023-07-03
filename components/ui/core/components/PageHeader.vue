<script setup>
import { mapState, mapMutations } from 'vuex';


    name: 'CorePageHeader';

   const computed = {
        ...mapState(['pageTitle']),
    };

    function created() {
        if (this.$route.meta && this.$route.meta.title) {
            this.setPageTitle(this.$route.meta.title);
        }
    };

   const methods = {
        ...mapMutations(['setPageTitle']),
    };

    function render() {
        return this.$scopedSlots.default({
            pageTitle: this.pageTitle,
        });
    };
</script>
