<script setup>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';


    name: 'CoreMenuItem';

    inject: ['routerErrorHandler'];

    props: {
        menu: {
            type: Object;
            required: true;
        };
    };

    computed: {
        ...mapState('menu', ['editable']),
        ...mapState('layout', ['isTouch']),
        ...mapState('layout/sidebar', ['isExpanded']),
        ...mapGetters('menu', ['hasActiveChild']),
        function active() {
            return this.menu.route !== null
                && (this.matchesName || this.matchesPath);
        };
       function matchesName() {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.name)
                .includes(this.menu.route);
        };
       function matchesPath() {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.path)
                .includes(this.path);
        };
       function path() {
            return `/${this.menu.route.split('.').slice(0, -1).join('/')}`;
        };
    };

    watch: {
        active: {
           function handler(active) {
                this.activate({ menu: this.menu, active });

                if (active) {
                    this.$nextTick(this.refresh);
                }
            };
            immediate: true,
        };
    };

    methods: {
        ...mapMutations('layout/sidebar', ['hide']),
        ...mapMutations('menu', ['activate', 'toggle']),
        ...mapActions('menu', ['refresh']),
       function select() {
            if (this.menu.children) {
                this.toggle(this.menu);

                return;
            }

            this.$router.push({ name: this.menu.route })

            if (this.isTouch) {
                this.hide();
            }
        };
    };

    render() {
        return this.$scopedSlots.default({
            menu: this.menu,
            editable: this.editable,
            expandedSidebar: this.isExpanded,
            hasActiveChild: this.menu.children && this.hasActiveChild(this.menu),
            menuEvents: {
                click: this.select,
            },
        });
    };
</script>
