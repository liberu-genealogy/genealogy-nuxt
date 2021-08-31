<template>
    <div class="item-tree"
        v-if="loaded">
        <p class="title is-5"
            v-if="title">
            {{ i18n(this.title) }}
        </p>
        <div class="filter is-flex">
            <div class="control name has-icons-left has-icons-right"
                v-if="!state.item">
                <input class="input"
                    v-model="state.query"
                    :placeholder="i18n('Filter')"
                    @keyup.esc="state.query = ''">
                <span class="icon is-left">
                    <fa icon="search"/>
                </span>
                <span class="icon is-right">
                    <a class="delete is-small"
                        @click="state.query = ''"
                        v-if="state.query"/>
                </span>
            </div>
            <div class="control name has-icons-right"
                v-else>
                <input class="input"
                   :class="{ 'is-danger': errors.any() }"
                    v-model="state.item.name"
                    v-focus
                    :placeholder="i18n('Add new item')"
                    @input="errors.empty()"
                    @keyup.enter="save"
                    @keyup.esc="state.item.name = ''">
                <span class="icon is-right">
                    <a class="delete is-small"
                        @click="state.item.name = ''"
                        v-if="state.item.name"/>
                </span>
                <p class="help is-danger"
                   v-if="errors.any()">
                    {{ i18n(errors.first()) }}
                </p>
            </div>
            <template v-if="state.editable">
                <div class="control"
                    v-if="!state.query && !state.item && canAdd">
                    <a class="button"
                        @click="state.item = factory(); selected = null">
                        <span>
                            {{ i18n('Add') }}
                        </span>
                        <span class="icon">
                            <fa icon="plus"/>
                        </span>
                    </a>
                </div>
                <template v-if="state.item">
                    <div class="control">
                        <a class="button"
                            @click="cancel">
                            <span>
                                {{ i18n('Cancel') }}
                            </span>
                            <span class="icon">
                                <fa icon="ban"/>
                            </span>
                        </a>
                    </div>
                    <div class="control"
                        v-if="state.item.name">
                        <a class="button"
                            :class="{'is-loading': state.loading}"
                            @click="save">
                            <span>
                                {{ i18n('Save') }}
                            </span>
                            <span class="icon">
                                <fa icon="database"/>
                            </span>
                        </a>
                    </div>
                </template>
            </template>
        </div>
        <div class="items mt-3">
            <items class="root"
                :items="filtered"
                :parent-id="null"
                @moved="moved"
                v-on="$listeners"
                v-if="items">
                <template v-slot:item="props">
                    <slot name="item"
                        v-bind="props"/>
                </template>
                <template v-slot:controls="props">
                    <slot name="controls"
                        v-bind="props"/>
                </template>
            </items>
            <loader size="large"
                v-else/>
        </div>
    </div>
</template>

<script>
import Loader from '@enso-ui/loader/bulma'
import Errors from '@enso-ui/laravel-validation';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSearch, faPlus, faBan, faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';
import Items from './Items.vue';

library.add(faSearch, faPlus, faBan, faDatabase);

export default {
    name: 'Tree',

    directives: { focus },

    components: { Items, Loader },

    inject: ['errorHandler', 'i18n', 'route'],

    props: {
        editable: {
            type: Boolean,
            default: false,
        },
        expanded: {
            type: Array,
            default: () => ([]),
        },
        objects: {
            type: Boolean,
            default: false,
        },
        routeGroup: {
            type: [String, Function],
            required: true,
        },
        title: {
            type: String,
            default: null,
        },
        value: {
            type: [Number, Object],
            default: null,
        },
    },

    data: v => ({
        cache: null,
        errors: new Errors(),
        items: null,
        loaded: false,
        state: {
            dragging: null,
            editable: v.editable,
            expanded: v.expanded,
            item: null,
            loading: false,
            maxNestingLevel: null,
            objects: v.objects,
            original: null,
            query: '',
            selected: null,
        },
    }),

    computed: {
        canAdd() {
            return this.maxNestingLevel === null
                || this.level() <= this.maxNestingLevel;
        },
        exceedsMaxLevel() {
            return this.maxLevel > this.maxNestingLevel + 1;
        },
        filtered() {
            return this.state.query
                ? this.filter(this.clone())
                : this.items;
        },
        maxLevel() {
            return this.level(null, true);
        },
    },

    watch: {
        editable(editable) {
            this.state.editable = editable;
        },
        'state.query': {
            handler(query) {
                if (query.length > 0) {
                    this.expanded.splice(0, this.expanded.length);
                    this.expand(this.filtered);
                }
            },
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        backup() {
            this.cache = JSON.stringify(this.items);
        },
        cancel() {
            this.state.item.name = this.state.original;
            this.state.item = null;
            this.state.original = null;
            this.errors.empty();
        },
        clone() {
            return JSON.parse(JSON.stringify(this.items));
        },
        create() {
            this.state.loading = true;
            const route = this.route(`${this.routePrefix()}.store`);

            this.$axios.post(route, this.payload())
                .then(({ data }) => {
                    this.push(data.item);
                    this.state.item = null;
                }).catch(this.handler)
                .finally(() => (this.state.loading = false));
        },
        expand(items) {
            items.forEach(item => {
                this.expanded.push(item);

                if (item.items) {
                    this.expand(item.items);
                }
            });
        },
        expandParents(item) {
            const parent = this.flatten()
                .filter(({ items }) => items)
                .find(({ items }) => items.some(current => this.is(current, item)));

            if (parent) {
                this.state.expanded.push(parent);
                this.expandParents(parent);
            }
        },
        factory() {
            return {
                id: null,
                name: '',
                items: [],
                orderIndex: null,
            };
        },
        fetch() {
            this.$axios.get(this.route(`${this.routePrefix()}.index`))
                .then(({ data: { items, maxNestingLevel } }) => {
                    this.items = items;
                    this.maxNestingLevel = maxNestingLevel;
                    this.preselect();
                    this.backup();
                    this.loaded = true;
                    this.$emit('loaded', items);
                }).catch(this.errorHandler);
        },
        filter(items) {
            return items.filter(item => this.matches(item))
                .map(item => this.map(item));
        },
        isLeaf(item) {
            return !item.items || item.items.length === 0;
        },
        is(first, second) {
            return first.id === second.id && first.group === second.group;
        },
        find(id, group) {
            return this.flatten()
                .find(current => this.is(current, { id, group }));
        },
        flatten(items = this.items) {
            return items.reduce((flat, item) => {
                flat.push(item);

                if (item.items) {
                    flat.push(...this.flatten(item.items));
                }

                return flat;
            }, []);
        },
        handler(error) {
            this.state.loading = false;

            const { status, data } = error.response;

            if (status === 422) {
                this.errors.set(data.errors);
            } else {
                this.errorHandler(error);
            }
        },

        level(item = null, max = false) {
            if (this.items.length === 0) {
                return 0;
            }

            let items;

            if (item) {
                if (!max && this.matchesSelection(item)) {
                    return 0;
                }

                if (this.isLeaf(item)) {
                    return max ? 0 : -1;
                }

                items = item.items;
            } else {
                items = this.items;
            }

            const [level] = items.map(item => this.level(item, max))
                .sort().reverse();

            return level >= 0 ? level + 1 : level;
        },
        map(item) {
            if (item.items) {
                item.items = this.filter(item.items);
            }

            return item;
        },
        matches(item) {
            return item.name.toLowerCase()
                .indexOf(this.state.query.toLowerCase()) > -1
                || item.items?.some(child => this.matches(child));
        },
        matchesSelection(item) {
            return item.id === this.state.selected?.id
                && item.parentId === this.state.selected?.parentId;
        },
        moved(item) {
            const { id, parentId, newIndex } = item;

            if (this.exceedsMaxLevel) {
                this.restore();
                return;
            }

            const route = this.route(`${this.routePrefix(item)}.move`, id);

            this.$axios.patch(route, { parentId, newIndex })
                .then(() => this.backup())
                .catch(error => {
                    this.restore();

                    this.errorHandler(error);
                });
        },
        preselect() {
            if (this.value) {
                const value = this.objects ? this.value.id : this.value;

                this.state.selected = this.flatten()
                    .find(({ id }) => id === value);

                this.state.selected.selected = true;
                this.expandParents(this.state.selected);
            }
        },
        payload() {
            return {
                ...this.state.item,
                parentId: this.state.selected ? this.state.selected.id : null,
                orderIndex: this.state.selected
                    ? this.state.selected.items.length + 1
                    : this.items.length + 1,
            };
        },
        push(item) {
            if (this.state.selected) {
                this.flatten().find(({ id, parentId }) => id === this.state.selected.id
                    && parentId === this.state.selected.parentId).items.push(item);
            } else {
                this.items.push(item);
            }
        },
        restore() {
            this.items = JSON.parse(this.cache);
        },
        routePrefix(item = null) {
            return typeof this.routeGroup === 'string'
                ? this.routeGroup
                : this.routeGroup(item);
        },
        save() {
            if (this.state.item.id) {
                this.update();
            } else {
                this.create();
            }
        },
        update() {
            this.state.loading = true;
            const { item } = this.state;
            const route = this.route(`${this.routePrefix(item)}.update`, item.id);

            this.$axios.patch(route, item)
                .then(() => (this.state.item = null))
                .catch(this.handler)
                .finally(() => (this.state.loading = false));
        },
    },

    provide() {
        return {
            is: this.is,
            routePrefix: this.routePrefix,
            state: this.state,
        };
    },
};
</script>

<style lang="scss">
    .item-tree {
        .filter .name {
            flex-grow: 1;
        }

        .items {
            max-height: 35em;
            min-height: 10em;
            overflow: auto;
            position: relative;

            ul {
                padding: 0.1em;

                &.drag-area {
                    min-height: 3px;
                }
            }

            ul:not(.root) li {
                border-left: 1px solid #dbdbdb;
            }

            ul > li {
                margin-left: 1em;
                padding: 0.1em;

                &.sortable-ghost {
                    outline: 1px dashed;
                }
            }
        }

        .controls {
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
        }
    }
</style>
