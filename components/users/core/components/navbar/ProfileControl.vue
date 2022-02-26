<script>
import { mapState } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreProfileControl',

    inject: ['route', 'routerErrorHandler'],

    setup() {
        const visible = ref(false)
        const store = useStore()
        return {
            one: computed(() => store.state[uesr]),
            two: computed(() => store.state[layout].isTouch)
        }
        function hide() {
            this.visible = false;
        }
        function toggle() {
            this.visible = !this.visible;
        }
        function visitProfile() {
            this.$router.push({
                name: 'administration.users.show',
                params: { user: this.user.id },
            })
        }
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
