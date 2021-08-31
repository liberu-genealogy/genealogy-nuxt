<template>
    <li>
        <a class="item dropdown-item"
            :class="{ 'is-bold has-background-warning-light': item.selected }"
            @click="select">
            <div class="level">
                <div class="level-left">
                    <div class="level-item is-marginless"
                        v-if="hasChildren">
                        <span class="icon is-small"
                            @click.stop="toggle">
                            <fa icon="minus-square"
                                v-if="isExpanded"/>
                            <fa icon="plus-square"
                                v-else/>
                        </span>
                    </div>
                    <div class="level-item pl-3">
                        <slot name="item"
                            :item="item"
                            :highlight="highlight">
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <span v-html="highlight(item.name)"/>
                            <span class="icon has-text-info"
                                v-if="item.description"
                                v-tooltip="i18n(item.description)">
                            <fa icon="question-circle"/>
                        </span>
                        </slot>
                    </div>
                </div>
                <div class="level-right"
                    v-if="item.selected">
                    <div class="level-item">
                        <template v-if="state.editable">
                            <slot name="controls"
                                :item="item"/>
                            <a class="button is-naked is-small"
                                @click.stop="edit">
                                <span class="icon">
                                    <fa icon="pencil-alt"/>
                                </span>
                            </a>
                            <confirmation @confirm="destroy">
                                <a class="is-naked mr-2">
                                    <span class="icon">
                                        <fa icon="trash-alt"/>
                                    </span>
                                </a>
                            </confirmation>
                        </template>
                        <a class="delete is-small"
                            @click.stop="clear"/>
                    </div>
                </div>
            </div>
        </a>
        <items :items="item.items"
            :parent-id="item.id"
            v-on="$listeners"
            v-show="!hasChildren || isExpanded"
            v-if="canHaveChildren">
            <template v-slot:item="props">
                <slot name="item"
                    v-bind="props"/>
            </template>
            <template v-slot:controls="props">
                <slot name="controls"
                    v-bind="props"/>
            </template>
        </items>
    </li>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faMinusSquare, faPlusSquare, faPencilAlt, faTrashAlt, faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import Confirmation from '@enso-ui/confirmation/bulma';
import Items from './Items.vue';

library.add(faMinusSquare, faPlusSquare, faPencilAlt, faTrashAlt, faQuestionCircle);

export default {
    name: 'Item',

    directives: { tooltip: VTooltip },

    components: { Items, Confirmation },

    inject: ['errorHandler', 'route', 'state', 'i18n', 'is', 'routePrefix'],

    props: {
        item: {
            type: Object,
            required: true,
        },
        splice: {
            type: Function,
            required: true,
        },
    },

    computed: {
        canHaveChildren() {
            return !!this.item.items;
        },
        hasChildren() {
            return this.item.items?.length > 0;
        },
        isExpanded() {
            return this.state.expanded
                .some(current => this.is(current, this.item));
        },
    },

    methods: {
        bold(label, arg) {
            let from;

            try {
                from = new RegExp(`(${arg})`, 'gi');
            } catch {
                from = arg;
            }

            return `${label}`.replace(from, '<b>$1</b>');
        },
        clear() {
            this.item.selected = false;
            this.$emit('input', null);
            this.$emit('deselected', this.item);
            this.state.selected = null;
        },
        destroy() {
            const routePrefix = this.routePrefix(this.item);
            const route = this.route(`${routePrefix}.destroy`, this.item.id);

            this.$axios.delete(route).then(() => {
                this.splice(this.item.id);
                this.state.selected = null;
            }).catch(this.errorHandler);
        },
        edit() {
            this.state.item = this.state.selected;
            this.state.original = this.state.selected.name;
        },
        highlight(label) {
            return this.state.query.toLowerCase().split(' ')
                .filter(arg => arg !== '')
                .reduce((label, arg) => this.bold(label, arg), label);
        },
        select() {
            if (this.state.selected) {
                this.state.selected.selected = false;
            }

            this.item.selected = true;
            this.state.selected = this.item;
            const input = this.state.objects ? this.item : this.item.id;
            this.$emit('input', input);
            this.$emit('selected', this.item);
        },
        toggle() {
            if (!this.hasChildren) {
                return;
            }

            const index = this.state.expanded
                .findIndex(current => this.is(current, this.item));

            if (index >= 0) {
                this.state.expanded.splice(index, 1);
            } else {
                this.state.expanded.push(this.item);
            }
        },
    },
};
</script>

<style lang="scss">
    a.item.dropdown-item {
        padding: 0.5em 0.7em;
    }
</style>
