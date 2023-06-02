<script>
import { mapState } from 'vuex';

export default {
    name: 'CoreAppFooter',

    computed: {
        ...mapState(['meta']),
    },

    render() {
        return this.$scopedSlots.default({
            meta: this.meta,
        });
    },
};
</script>
