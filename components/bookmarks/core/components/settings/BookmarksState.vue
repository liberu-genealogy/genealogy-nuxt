<script setup>
import { computed, useStore } from 'vuex';

    name: 'CoreBookmarksState';

    computed: {
   
 function useComputedValues() {
  const store = useStore();

  const bookmarks = computed(() => {
    return store.getters['preferences/bookmarks'];
  });

  return {
    bookmarks,
  };
};

    };

    methods: {
       function useMutationsAndActions() {
  const store = useStore();

  const emptyBookmarks = () => {
    store.commit('bookmarks/empty');
  };

  const pushBookmark = (bookmark) => {
    store.commit('bookmarks/push', bookmark);
  };

  const setBookmarksState = (state) => {
    store.dispatch('preferences/setBookmarksState', state);
  };

  return {
    emptyBookmarks,
    pushBookmark,
    setBookmarksState,
  };
};
        function update(state) {
            if (state) {
                this.push(this.$route);
            } else {
                this.empty();
            }

            this.setBookmarksState(state);
        };
    };

    function render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.bookmarks,
            },
            events: {
                input: state => this.update(state),
            },
        })
    };

</script>
