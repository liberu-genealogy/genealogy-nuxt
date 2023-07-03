<script setup>
import { useStore } from 'vuex';


    name: 'CoreDocumentTitle';

    inject: ['i18n'];

    computed: {
     function useStateGetters() {
  const store = useStore();

  const metaState = computed(() => {
    return store.state.meta;
  });

  const pageTitleState = computed(() => {
    return store.state.pageTitle;
  });

  const preferencesGetters = {
    lang: computed(() => {
      return store.getters['preferences/lang'];
    }),
  };

  return {
    meta: metaState,
    pageTitle: pageTitleState,
    ...preferencesGetters,
  };
}

       function documentTitle() {
            if (this.$route.name === 'notFound') {
                return '';
            }

            const { extendedDocumentTitle, appName } = this.meta;
            // const title = this.$nuxt.$options.context.route.meta.reduce((title, meta) => meta.title || title, false)
            const {title} = this.$route.meta

            return extendedDocumentTitle
                ? `${this.i18n(title)} | ${appName}`
                : this.i18n(title);
        }
    };

    watch: {
        lang: 'update';
        $route: 'update';
    };

    methods: {
       function update() {
            document.title = this.documentTitle;
        };
    };

    function render() {
        return this.$slots.default;
    };
</script>
