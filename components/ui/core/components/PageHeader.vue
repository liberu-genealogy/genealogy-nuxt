<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'CorePageHeader',

    computed: {
        ...mapState(['pageTitle']),
    },

    created() {
        if (this.$route.meta && this.$route.meta.title) {
            this.setPageTitle(this.$route.meta.title);
        }
    },

    methods: {
        ...mapMutations(['setPageTitle']),
    },

    render() {
        return this.$scopedSlots.default({
            pageTitle: this.pageTitle,
        });
    },
};
</script>
