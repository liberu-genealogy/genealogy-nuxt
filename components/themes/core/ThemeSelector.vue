<script setup>
import { mapState, mapGetters, mapActions } from 'vuex';


    name: 'CoreThemeSelector';

    computed: {
        ...mapState('layout', ['themes']),
        ...mapGetters('preferences', ['theme']),
        ...mapGetters('localisation', ['rtl']),
       function alternate() {
            return Object.keys(this.themes)
                .find(theme => theme.replace('-rtl', '') !== this.theme.replace('-rtl', '')) + (this.rtl ? '-rtl' : '');
        };
       function multiTheme() {
            return Object.keys(this.themes).length > 1;
        };
    };

    methods: {
        ...mapActions('preferences', ['setTheme']),
    };

    render() {
        return this.$scopedSlots.default({
            multiTheme: this.multiTheme,
            itemEvents: {
                click: () => this.setTheme(this.alternate),
            },
        });
    }

</script>
