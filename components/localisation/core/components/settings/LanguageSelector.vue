<script>
import { mapState, mapGetters, mapActions } from 'vuex';


   const name= 'LanguageSelector';

   const computed= {
        ...mapState('localisation', ['languages']),
        ...mapGetters('preferences', ['lang']),
        multiLanguage() {
            return Object.keys(this.languages).length > 1;
        },
    };

   const methods= {
        ...mapActions('preferences', ['setLang']),
    };

    function render() {
        return this.$scopedSlots.default({
            multiLanguage: this.multiLanguage,
            locale: this.lang,
            languages: this.languages,
            update: this.setLang,
        });
    }

</script>
