<script setup>
import { mapState, mapGetters, mapMutations } from 'vuex';


   const name= 'CoreBookmarks';

    const inject= ['routerErrorHandler'];

   const props = {
        excluded: {
            type: Array,
            defaultValue: () => ([]),
        },
    };

    const data= () => ({
        scrollInterval: null,
        scrollStep: 5,
    });

     const computed= {
        ...mapState('bookmarks', ['bookmarks']),
        ...mapGetters('bookmarks', ['isExcluded', 'matches', 'stickies', 'index']),
        container() {
            return this.$el.querySelector('.bookmark-items');
        },
    };
   const watch = {
        $route(route) {
            this.add(route);
        },
    };

   function created() {
        this.init();
        this.exclude(this.excluded);
        this.add(this.$route);
    };

    methods: {
      function useMutations() {
  const store = useStore();

  const bookmarksMutations = {
    init: () => {
      store.commit('bookmarks/init');
    },
    set: (payload) => {
      store.commit('bookmarks/set', payload);
    },
    exclude: (payload) => {
      store.commit('bookmarks/exclude', payload);
    },
    push: (payload) => {
      store.commit('bookmarks/push', payload);
    },
    stick: (payload) => {
      store.commit('bookmarks/stick', payload);
    },
    clear: () => {
      store.commit('bookmarks/clear');
    },
    remove: (payload) => {
      store.commit('bookmarks/remove', payload);
    },
  };

  return {
    ...bookmarksMutations,
  };
}

        function add(bookmark) {
            this.push(bookmark);
            this.$nextTick(this.focus);
        };
        function uniqueId(bookmark) {
            const { name, params, query } = bookmark;

            return JSON.stringify({ name, params, query });
        };
        function remove(bookmark) {
            this.splice(bookmark);
            const { name, params, query } = this.bookmarks[this.bookmarks.length - 1];
            this.$router.push({ name, params, query })
        };
       function item(index) {
            const items = this.container.querySelectorAll('.control');
            return items[index];
        };
        function focus() {
            clearInterval(this.scrollInterval);

            const bookmark = this.item(this.index(this.$route));

            if (!bookmark) {
                return;
            }

            const containerLeft = this.container.scrollLeft;
            const containerRight = containerLeft + this.container.clientWidth;
            const bookmarkLeft = bookmark.offsetLeft;
            const bookmarkRight = bookmarkLeft + bookmark.clientWidth;

            if (bookmarkLeft < containerLeft) {
                const remaining = (containerLeft - bookmarkLeft) % this.scrollStep;
                this.scroll(bookmarkLeft, -1, remaining);
            }

            if (bookmarkRight > containerRight) {
                const amount = bookmarkRight - containerRight;
                const remaining = amount % this.scrollStep;
                this.scroll(amount, 1, remaining);
            }
        };
       function scroll(amount, direction, remaining) {
            if (remaining) {
                this.container.scrollLeft += remaining * direction;
            }

            this.scrollInterval = setInterval(() => {
                if (this.container.scrollLeft === amount) {
                    clearInterval(this.scrollInterval);
                    return;
                }

                this.container.scrollLeft += this.scrollStep * direction;
            }, 1);
        };
    };

    function render() {
        return this.$scopedSlots.default({
            bookmarks: this.bookmarks,
            hasClear: this.stickies.length,
            matches: this.matches,
            stick: this.stick,
            isExcluded: this.isExcluded,
            stickBindings: bookmark => ({
                click: () => this.stick(bookmark),
            }),
            bookmarkBindings: bookmark => {
                this.uniqueId(bookmark);
            },
            removeBindings: bookmark => ({
                click: () => this.remove(bookmark),
            }),
            bookmarkEvents: bookmark => ({
                click: () => this.$router.push(bookmark)
            }),
            clearBindings: {
                click: () => this.clear(this.$route),
            },
            reorderBindings: {
                value: this.bookmarks,
            },
            reorderEvents: {
                input: bookmarks => (this.set(bookmarks)),
            },
        });
    };
</script>
