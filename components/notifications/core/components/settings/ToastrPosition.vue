<script setup>
import { mapGetters, mapActions } from 'vuex';
import { positions } from '@enso-ui/toastr/config';


    const name= 'CoreToastrPosition';

    const inject= ['toastr'];

    const data= () => ({
        positions,
    });

   const computed= {
        ...mapGetters('preferences', ['toastrPosition']),
    };

   function created() {
        if (this.toastrPosition) {
            this.toastr.defaults({ position: this.toastrPosition }).reset();
            this.$toastr.defaults({ position: this.toastrPosition }).reset();
        }
    };

   const methods= {
        ...mapActions('preferences', ['setToastrPosition']),
        update(position) {
            this.setToastrPosition(position);
            this.toastr.defaults({ position }).reset();
            this.$toastr.defaults({ position }).reset();
        },
    };

    function render() {
        return this.$scopedSlots.default({
            toastrPosition: this.toastrPosition,
            positions: this.positions,
            update: this.update,
        });
    };

</script>
