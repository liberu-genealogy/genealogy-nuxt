<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'CoreKeyCollector',

    data: () => ({
        collect: false,
    }),

    computed: mapState(['meta']),

    methods: {
        ...mapMutations('localisation', ['setKeyCollector']),
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
