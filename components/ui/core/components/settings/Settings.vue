<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'CoreSettings',

    computed: {
        ...mapState(['user']),
        ...mapState(['meta']),
        ...mapState('layout', ['themes']),
        ...mapGetters('layout/settings', ['items']),
        ...mapState('localisation', ['languages']),
        multiTheme() {
            return Object.keys(this.themes).length > 1;
        },
    },

    render() {
        return this.$scopedSlots.default({
            multiTheme: this.multiTheme,
            meta: this.meta,
            items: this.items,
        });
    },
};
</script>
