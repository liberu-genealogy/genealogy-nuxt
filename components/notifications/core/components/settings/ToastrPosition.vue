<script>
import { mapGetters, mapActions } from 'vuex';
import { positions } from '@enso-ui/toastr/config';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreToastrPosition',

    inject: ['toastr'],

    setup() {
        const positions = ref('')
        const store = useStore()
        return {
            one: computed(() => store.getters['${preferences}/toastrPosition'])
        }
        created(() => {
            if (this.toastrPosition) {
                this.toastr.defaults({ position: this.toastrPosition }).reset();
                this.$toastr.defaults({ position: this.toastrPosition }).reset();
            }
        })
        return {
            ...mapActions('preferences', ['setToastrPosition']),
        }
        function update(position) {
            this.setToastrPosition(position);
            this.toastr.defaults({ position }).reset();
            this.$toastr.defaults({ position }).reset();
        }
    },

    render() {
        return this.$scopedSlots.default({
            toastrPosition: this.toastrPosition,
            positions: this.positions,
            update: this.update,
        });
    },
};

</script>
