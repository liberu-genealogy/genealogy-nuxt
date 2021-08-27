<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Auth',

    computed: {
        ...mapState(['guestState']),
    },

    created() {
        this.loadGuestState();
    },

    methods: {
        ...mapActions(['loadGuestState']),
    },

    render() {
        return this.$scopedSlots.default({
            guestState: this.guestState,
        });
    },
};
</script>
