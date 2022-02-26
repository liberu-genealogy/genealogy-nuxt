<script>
import { mapState, mapMutations } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CorePageHeader',
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[pageTitle])
        }
        created(() => {
            if (this.$route.meta && this.$route.meta.title) {
                this.setPageTitle(this.$route.meta.title);
            }
        })
        return {
            ...mapMutations(['setPageTitle']),
        }
    },

    render() {
        return this.$scopedSlots.default({
            pageTitle: this.pageTitle,
        });
    },
};
</script>
