<script setup>
import { mapState, mapActions } from 'vuex';


    name: 'CoreAuth';

   const computed = {
        ...mapState(['guestState']),
    };

    function created() {
        this.loadGuestState();
    };

    const methods = {
        ...mapActions(['loadGuestState']),
    };

    function render() {
        return this.$scopedSlots.default({
            guestState: this.guestState,
        });
    };
</script>
