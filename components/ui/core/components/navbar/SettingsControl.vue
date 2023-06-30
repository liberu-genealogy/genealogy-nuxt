<script setup>
import { mapMutations } from 'vuex';


    name: 'CoreSettingsControl';

    methods: {
        ...mapMutations('layout/settings', ['toggle']),
    };

    render() {
        return this.$scopedSlots.default({
            toggle: this.toggle,
        });
    };
</script>
