<script>
import { mapState, mapMutations } from 'vuex';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'CoreSearch',

    inject: ['errorHandler', 'i18n', 'routerErrorHandler'],

    props: {
        labels: {
            type: Object,
            default: () => ({
                placeholder: 'Search something',
                searching: 'Searching...',
                noResults: 'Nothing found',
            }),
        },
    },
    setup() {
        const selectedTags = ref([])
        const store = useStore()
        return {
            one: computed(() => store.state[layout/navbar].isVisible)
        }
        onMounted(() => {
            this.addShortcut();
        })
        return{
            ...mapMutations('layout/navbar', ['show', 'hide']),
        }
        function redirect(item, to = null) {
            if (!to && !item.routes.length) {
                return;
            }

            this.$router.push({
                name: to || item.routes[0].name,
                params: item.param,
            }).catch(this.routerErrorHandler);

            this.selectedTags = [];
            this.hide();
        }
        function tags(items) {
            return items.reduce((tags, { group }) => {
                if (!tags.includes(group)) {
                    tags.push(group);
                }
                return tags;
            }, []);
        }
        function filter(items) {
            let filtered = this.filtered(items);

            if (!filtered.length && this.selectedTags.length) {
                this.selectedTags = [];
                filtered = this.filtered(items);
            }
            return filtered;
        }
        function filtered(items) {
            return this.selectedTags.length
                ? items.filter(item => this.selectedTags.includes(item.group))
                : items;
        }
        function keyDown(event) {
            const { target, key } = event;

            const shouldFocus = !this.isVisible && key === '/'
                && !['input', 'textarea'].includes(target.tagName.toLowerCase())
                && !target.isContentEditable;

            const shouldHide = this.isVisible && key === 'Escape';

            if (shouldFocus) {
                event.preventDefault();
                this.showSearch();
            }

            if (shouldHide) {
                event.preventDefault();
                this.hide();
            }
        }
        function showSearch() {
            this.show();

            this.$nextTick(() => this.$el.querySelector('input').focus());
        }
        function toggle(tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index > -1) {
                this.selectedTags.splice(index, 1);
                return;
            }
            this.selectedTags.push(tag);
        }
        function selected(tag) {
            return this.selectedTags.includes(tag);
        }
        function addShortcut() {
            document.addEventListener('keydown', this.keyDown);

            this.$once('hook:destroyed', () => {
                document.removeEventListener('keydown', this.keyDown);
            });
        }
    },
    render() {
        return this.$scopedSlots.default({
            bindings: {
                source: 'core.search.index',
                filter: this.filter,
                placeholder: this.i18n(this.labels.placeholder),
                searching: this.i18n(this.labels.searching),
                noResults: this.i18n(this.labels.noResults),
                errorHandler: this.errorHandler,
            },
            controlEvents: {
                click: e => {
                    this.showSearch();
                    e.stopPropagation();
                },
            },
            events: {
                selected: this.redirect,
            },
            hide: this.hide,
            isVisible: this.isVisible,
            redirect: this.redirect,
            toggle: this.toggle,
            selected: this.selected,
            tags: this.tags,
        });
    },
};
</script>
