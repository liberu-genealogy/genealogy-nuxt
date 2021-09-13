<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'CoreBookmarks',

    inject: ['routerErrorHandler'],

    props: {
        excluded: {
            type: Array,
            default: () => ([]),
        },
    },

    data: () => ({
        scrollInterval: null,
        scrollStep: 5,
    }),

    computed: {
        ...mapState('bookmarks', ['bookmarks']),
        ...mapGetters('bookmarks', ['isExcluded', 'matches', 'stickies', 'index']),
        container() {
            return this.$el.querySelector('.bookmark-items');
        },
    },

    watch: {
        $route(route) {
            this.add(route);
        },
    },

    created() {
        this.init();
        this.exclude(this.excluded);
        this.add(this.$route);
    },

    methods: {
        ...mapMutations('bookmarks', ['init', 'set', 'exclude', 'push', 'stick', 'clear']),
        ...mapMutations('bookmarks', { splice: 'remove' }),
        add(bookmark) {
            this.push(bookmark);
            this.$nextTick(this.focus);
        },
        uniqueId(bookmark) {
            const { name, params, query } = bookmark;

            return JSON.stringify({ name, params, query });
        },
        remove(bookmark) {
            this.splice(bookmark);
            const { name, params, query } = this.bookmarks[this.bookmarks.length - 1];
            this.$router.push({ name, params, query })
        },
        item(index) {
            const items = this.container.querySelectorAll('.control');
            return items[index];
        },
        focus() {
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
        },
        scroll(amount, direction, remaining) {
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
        },
    },

    render() {
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
    },
};
</script>
