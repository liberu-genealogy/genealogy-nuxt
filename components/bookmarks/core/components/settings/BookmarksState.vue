<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreBookmarksState',
    setup() {
        const store = useStore()
        return {
            one: computed(() => store.getters['${preferences}/bookmarks'])
        }
        return {
            ...mapMutations('bookmarks', ['empty', 'push']),
            ...mapActions('preferences', ['setBookmarksState']),
        }
        function update(state) {
            if (state) {
                this.push(this.$route);
            } else {
                this.empty();
            }

            this.setBookmarksState(state);
        }
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
