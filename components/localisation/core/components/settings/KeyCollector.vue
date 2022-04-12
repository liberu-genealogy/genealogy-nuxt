<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'KeyCollector',

    data: () => ({
        collect: false,
    }),

    computed: mapState(['meta']),

    methods: {
        ...mapMutations('localisation', ['setKeyCollector']),
    },

    render() {
        return this.$slots.default({
            isLocal: this.meta.env === 'local',
            bindings: {
                modelValue: this.collect,
            },
            events: {
                'update:modelValue': state => {
                    this.collect = state;
                    this.setKeyCollector(state);
                },
            },
        });
    },
};

</script>
