<script>
import { mapState, mapMutations } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreMenuOrganizer',
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[menu].editable)
        }
        return {
            ...mapMutations('menu', ['edit']),
        }
    },
    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.editable,
            },
            events: {
                input: this.edit,
            },
        });
    },
};

</script>
