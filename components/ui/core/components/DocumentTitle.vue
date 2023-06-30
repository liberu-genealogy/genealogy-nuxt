<script setup>
import { mapState, mapGetters } from 'vuex';


    name: 'CoreDocumentTitle';

    inject: ['i18n'];

    computed: {
        ...mapState(['meta', 'pageTitle']),
        ...mapGetters('preferences', ['lang']),
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
        },
    };

    watch: {
        lang: 'update',
        $route: 'update',
    };

    methods: {
       function update() {
            document.title = this.documentTitle;
        };
    };

    render() {
        return this.$slots.default;
    };
</script>
