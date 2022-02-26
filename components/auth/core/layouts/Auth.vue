<script>
import { mapState, mapActions } from 'vuex';
import { ref, computed, useStore } from 'vue';
export default {
    setup() {
        const name = ref('CoreAuth')
        const store = useStore()
        return {
            one: computed(() => store.stae[guestState])
        }
        created(() => {
            this.loadGuestState();
        })
        return{
             ...mapActions(['loadGuestState']),
        }
        render(() => {
            return this.$scopedSlots.default({
                guestState: this.guestState,
            });
        })
    }
}
</script>
