<script setup>
import { mapState, mapActions } from 'vuex';


    name: 'CoreAuth';

    computed: {
        ...mapState(['guestState']),
    };

    created() {
        this.loadGuestState();
    };

    methods: {
        ...mapActions(['loadGuestState']),
    };

    render() {
        return this.$scopedSlots.default({
            guestState: this.guestState,
        });
    };
</script>
