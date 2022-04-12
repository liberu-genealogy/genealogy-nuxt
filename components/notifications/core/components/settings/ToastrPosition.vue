<script>
import { mapGetters, mapActions } from 'vuex';
import { positions } from '@enso-ui/toastr/config';

export default {
    name: 'ToastrPosition',

    inject: ['toastr'],

    data: () => ({
        positions,
    }),

    computed: {
        ...mapGetters('preferences', ['toastrPosition']),
    },

    methods: {
        ...mapActions('preferences', ['setToastrPosition']),
        update(position) {
            this.setToastrPosition(position);
            this.toastr.setup(position);
        },
    },

    render() {
        return this.$slots.default({
            toastrPosition: this.toastrPosition,
            positions: this.positions,
            update: this.update,
        });
    },
};

</script>
