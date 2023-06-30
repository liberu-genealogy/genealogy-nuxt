<script setup>
import { mapState } from 'vuex';


    name: 'CoreAppFooter';

    computed: {
        ...mapState(['meta']),
    };

    render() {
        return this.$scopedSlots.default({
            meta: this.meta;
        });
    };
</script>
