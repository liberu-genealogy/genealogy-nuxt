<script>
import { mapState, mapMutations } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreMissingKeys',

    inject: ['errorHandler', 'route', 'toastr'],

    setup() {
        const hover = ref(false)
        const store = useStore()
        return {
            one: computed(() => store.state[localisation].keyCollector.missingKeys),
            two: computed(() => store.state[layout].isTouch)
        }
        const count = computed(() => {
            return this.missingKeys.length;
        })
        const mappedKeys = computed(() => {
            return this.missingKeys
                .map(key => ({ [key]: null }));
        })
        return {
            ...mapMutations('localisation', ['addKey', 'clearMissingKeys']),
        }
        function persist() {
            this.$axios.patch(
                this.route('system.localisation.addKey'),
                { keys: this.missingKeys },
            ).then(({ data }) => {
                this.missingKeys.forEach(key => this.addKey(key));
                this.clearMissingKeys();
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        }

    },

    render() {
        return this.$scopedSlots.default({
            keyCollector: this.keyCollector,
            isTouch: this.isTouch,
            hover: this.hover,
            count: this.count,
            events: {
                click: this.persist,
                mouseenter: () => (this.hover = true),
                mouseleave: () => (this.hover = false),
            },
        });
    },
};
</script>
