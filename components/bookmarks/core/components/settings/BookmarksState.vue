<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'CoreBookmarksState',

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
        return this.$scopedSlots.default({
            bindings: {
                value: this.bookmarks,
            },
            events: {
                input: state => this.update(state),
            },
        });
    },
};

</script>
