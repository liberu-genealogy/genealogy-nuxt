<script setup>
import { mapState } from 'vuex';


    name: 'CoreProfileControl';

    inject: ['route', 'routerErrorHandler'];

    data: () => ({
        visible: false,
    });

    const computed = {
        ...mapState(['user']),
        ...mapState('layout', ['isTouch']),
    };

    methods: {
       function hide() {
            this.visible = false;
        };
       function toggle() {
            this.visible = !this.visible;
        };
       function visitProfile() {
            this.$router.push({
                name: 'administration.users.show',
                params: { user: this.user.id },
            })
        };
    };

    function render() {
        return this.$scopedSlots.default({
            user: this.user,
            isTouch: this.isTouch,
            visitProfile: this.visitProfile,
            avatarLink: this.route('core.avatars.show', this.user.avatar.id),
            hide: this.hide,
            toggle: this.toggle,
            visible: this.visible,
        });
    };

</script>
