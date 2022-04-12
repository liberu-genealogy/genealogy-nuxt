<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'BookmarksState',

    computed: {
        ...mapGetters('preferences', ['bookmarks']),
    },

    methods: {
        ...mapMutations('bookmarks', ['empty', 'push']),
        ...mapActions('preferences', ['setBookmarksState']),
        update(state) {
            if (state) {
                this.push(this.$route);
            } else {
                this.empty();
            }

            this.setBookmarksState(state);
        },
    },

    render() {
        return this.$slots.default({
            bindings: {
                modelValue: this.bookmarks,
            },
            events: {
                'update:modelValue': state => this.update(state),
            },
        });
    },
};

</script>
