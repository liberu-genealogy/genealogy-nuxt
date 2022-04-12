<script>
import { mapState } from 'vuex';

export default {
    name: 'CoreProfileControl',

    inject: ['route', 'routerErrorHandler'],

    data: () => ({
        visible: false,
    }),

    computed: {
        ...mapState(['user']),
        ...mapState('layout', ['isTouch']),
    },

    methods: {
        hide() {
            this.visible = false;
        },
        toggle() {
            this.visible = !this.visible;
        },
        visitProfile() {
            this.$router.push({
                name: 'administration.users.show',
                params: { user: this.user.id },
            }).catch(this.routerErrorHandler);
        },
    },

    render() {
        return this.$slots.default({
            user: this.user,
            isTouch: this.isTouch,
            visitProfile: this.visitProfile,
            hide: this.hide,
            toggle: this.toggle,
            visible: this.visible,
        });
    },
};
</script>
