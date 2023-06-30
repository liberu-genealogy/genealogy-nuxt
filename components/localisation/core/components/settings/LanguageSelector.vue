<script setup>
import { computed, useStore } from 'vuex';


    name: 'LanguageSelector';

    computed: {
       function useComputedValues() {
  const store = useStore();

  const languages = computed(() => {
    return store.state.localisation.languages;
  });

  const lang = computed(() => {
    return store.getters['preferences/lang'];
  });

  return {
    languages,
    lang,
  };
};
       const multiLanguage() {
            return Object.keys(this.languages).length > 1;
        };
    };

    methods: {
       function useActions() {
  const store = useStore();

  const setLang = (lang) => {
    store.dispatch('preferences/setLang', lang);
  };

  return {
    setLang,
  };
};
    };

    render() {
        return this.$scopedSlots.default({
            multiLanguage: this.multiLanguage,
            locale: this.lang,
            languages: this.languages,
            update: this.setLang,
        });
    };


</script>
