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
            })
        },
    },

    render() {
        return this.$scopedSlots.default({
            user: this.user,
            isTouch: this.isTouch,
            visitProfile: this.visitProfile,
            avatarLink: this.route('core.avatars.show', this.user.avatar.id),
            hide: this.hide,
            toggle: this.toggle,
            visible: this.visible,
        });
    },
};
</script>
