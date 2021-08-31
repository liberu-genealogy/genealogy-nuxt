<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'LanguageSelector',

    computed: {
        ...mapState('localisation', ['languages']),
        ...mapGetters('preferences', ['lang']),
        multiLanguage() {
            return Object.keys(this.languages).length > 1;
        },
    },

    methods: {
        ...mapActions('preferences', ['setLang']),
    },

    render() {
        return this.$scopedSlots.default({
            multiLanguage: this.multiLanguage,
            locale: this.lang,
            languages: this.languages,
            update: this.setLang,
        });
    },
};

</script>
