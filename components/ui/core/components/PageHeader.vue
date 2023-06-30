<script setup>
import { mapState, mapMutations } from 'vuex';


    name: 'CorePageHeader';

    computed: {
        ...mapState(['pageTitle']),
    };

    function created() {
        if (this.$route.meta && this.$route.meta.title) {
            this.setPageTitle(this.$route.meta.title);
        }
    };

    methods: {
        ...mapMutations(['setPageTitle']),
    };

    render() {
        return this.$scopedSlots.default({
            pageTitle: this.pageTitle,
        });
    };
</script>
