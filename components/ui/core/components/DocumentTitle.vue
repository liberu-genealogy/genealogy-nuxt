<script>
import { mapState, mapGetters } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';
export default {
    name: 'CoreDocumentTitle',

    inject: ['i18n'],

    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[meta].pageTitle),
            two: computed(() => store.getters['${perferences}/lang'])
        }
        const documentTitle = computed(() => {
            if (this.$route.name === 'notFound') {
                return '';
            }
            const { extendedDocumentTitle, appName } = this.meta;
            // const title = this.$nuxt.$options.context.route.meta.reduce((title, meta) => meta.title || title, false)
            const {title} = this.$route.meta

            return extendedDocumentTitle
                ? `${this.i18n(title)} | ${appName}`
                : this.i18n(title);
        })
        watch(() => {
            const lang = ref('update')
            const $route = ref('update')
        })
        function update() {
            document.title = this.documentTitle;
        }
    },

    render() {
        return this.$slots.default;
    },
};
</script>
