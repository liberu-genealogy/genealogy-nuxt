<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'DocumentTitle',

    inject: ['i18n'],

    computed: {
        ...mapState(['meta', 'pageTitle']),
        ...mapGetters('preferences', ['lang']),
        documentTitle() {
            if (this.$route.name === 'notFound') {
                return '';
            }

            const { extendedDocumentTitle, appName } = this.meta;
            const { title } = this.$route.meta;

            return extendedDocumentTitle
                ? `${this.i18n(title)} | ${appName}`
                : this.i18n(title);
        },
    },

    watch: {
        lang: 'update',
        $route: 'update',
    },

    methods: {
        update() {
            document.title = this.documentTitle;
        },
    },

    render() {
        return this.$slots.default;
    },
};
</script>
