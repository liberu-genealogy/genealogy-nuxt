<script>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreMenuItem',

    inject: ['routerErrorHandler'],

    props: {
        menu: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.state[menu].editable),
            two: computed(() => store.state[layout].isTouch),
            three: computed(() => store.state[layout/sidbar].isExpanded),
            four: computed(() => store.getters['${menu}/hasActiveChild'])
        }
        const active = computed(() => {
             return this.menu.route !== null
                && (this.matchesName || this.matchesPath);
        })
        const matchesName = computed(() => {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.name)
                .includes(this.menu.route);
        })
        const matchesPath = computed(() => {
            return this.$route.matched
                .map((matchedRoute) => matchedRoute.path)
                .includes(this.path);
        })
        const path = computed(() => {
            return `/${this.menu.route.split('.').slice(0, -1).join('/')}`;
        })
        const active = ref('')
        watch(active, () => {
            
        })
        return {
            ...mapMutations('layout/sidebar', ['hide']),
            ...mapMutations('menu', ['activate', 'toggle']),
            ...mapActions('menu', ['refresh']),
        }
        function select() {
            if (this.menu.children) {
                this.toggle(this.menu);

                return;
            }

            this.$router.push({ name: this.menu.route })

            if (this.isTouch) {
                this.hide();
            }
        }
        const active = ref('')

        watch(active, (handler) => {
            this.activate({ menu: this.menu, active });

                if (active) {
                    this.$nextTick(this.refresh);
                }
        })

    },


    // watch: {
    //     active: {
    //         handler(active) {
                
    //         },
    //         immediate: true,
    //     },
    // },
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
    },
};
</script>
