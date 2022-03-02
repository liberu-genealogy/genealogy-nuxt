<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';
import { useContext } from 'unctx';

export default {
    name: 'LanguageSelector',

    setup() {
        // const store = useStore()
        return {
            one: computed(() => store.state[localisation].languages),
            two: computed(() => store.getters['${preferences}/lang'])
        }
        const multiLanguage = computed(() => {
            return Object.keys(this.languages).length > 1;
        })
        return {
            ...mapActions('preferences', ['setLang']),
        }

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
