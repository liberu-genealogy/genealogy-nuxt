<script>
import { mapGetters, mapActions } from 'vuex';
import { positions } from '@enso-ui/toastr/config';

export default {
    name: 'CoreToastrPosition',

    inject: ['toastr'],

    data: () => ({
        positions,
    }),

    computed: {
        ...mapGetters('preferences', ['toastrPosition']),
    },

    created() {
        if (this.toastrPosition) {
            this.toastr.defaults({ position: this.toastrPosition }).reset();
            this.$toastr.defaults({ position: this.toastrPosition }).reset();
        }
    },

    methods: {
        ...mapActions('preferences', ['setToastrPosition']),
        update(position) {
            this.setToastrPosition(position);
            this.toastr.defaults({ position }).reset();
            this.$toastr.defaults({ position }).reset();
        },
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
