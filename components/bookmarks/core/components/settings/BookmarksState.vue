<script setup>
import { mapGetters, mapMutations, mapActions } from 'vuex';


    name: 'CoreBookmarksState';

   const computed = {
        ...mapGetters('preferences', ['bookmarks']),
    };

   const methods = {
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
    };

   function render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.bookmarks,
            },
            events: {
                input: state => this.update(state),
            },
        });
    }

</script>
