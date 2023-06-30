<script setup>
import { mapState, mapMutations } from 'vuex';


    name: 'CoreMenuOrganizer';

    computed: {
        ...mapState('menu', ['editable']),
    };

    methods: {
        ...mapMutations('menu', ['edit']),
    };

    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.editable,
            },
            events: {
                input: this.edit,
            },
        });
    }

</script>
