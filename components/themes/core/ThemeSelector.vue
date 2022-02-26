<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreThemeSelector',
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[layout].themes),
            two: computed(() => store.getters['${preferences}/theme']),
            three: computed(() => store.getters['${localisation}/rtl'])
        }
        const alternate = computed(() => {
            return Object.keys(this.themes)
                .find(theme => theme.replace('-rtl', '') !== this.theme.replace('-rtl', '')) + (this.rtl ? '-rtl' : '');
        })
        const multiTheme = computed(() => {
            return Object.keys(this.themes).length > 1;
        })
        return {
            ...mapActions('preferences', ['setTheme']),
        }
    },

    render() {
        return this.$scopedSlots.default({
            multiTheme: this.multiTheme,
            itemEvents: {
                click: () => this.setTheme(this.alternate),
            },
        });
    },
};

</script>
