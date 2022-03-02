<script>
import { mapMutations, mapState } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreKeyCollector',

    setup() {
        const collect = ref(false)
        // const store = useStore()
        return {
            one: computed(() => store.state[meta])
        }
        return {
            ...mapMutations('localisation', ['setKeyCollector']),
        }
    },
    
    render() {
        return this.$scopedSlots.default({
            isLocal: this.meta.env === 'local',
            bindings: {
                value: this.collect,
            },
            events: {
                input: state => {
                    this.collect = state;
                    this.setKeyCollector(state);
                },
            },
        });
    },
};

</script>
