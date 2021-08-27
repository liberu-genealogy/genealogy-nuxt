<template>
    <core-search>
        <template v-slot:default="{ hide, selected, tags, toggle, redirect, bindings, controlEvents, events, isVisible }">
            <div class="navbar-item search animated fadeIn"
                v-if="isVisible">
                <enso-typeahead v-bind="bindings"
                    v-on="events"
                    v-click-outside="hide"
                    ref="typeahead">
                    <template v-slot:controls="{ items }">
                        <div class="dropdown-item" v-if="items.length">
                            <div class="tags centered">
                                <span v-for="(tag, index) in tags(items)"
                                    :key="index"
                                    class="tag is-uppercase is-bold is-clickable"
                                    :class="{ 'is-info': selected(tag) }"
                                    @click.stop="toggle(tag)">
                                    {{ i18n(tag ) }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-slot:option="{ highlight, item }">
                        <span class="tag is-bold is-warning is-uppercase">
                            {{ i18n(item['group']) }}
                        </span>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <span v-html="highlight(item['label'])"
                            class="ml-2"/>
                        <span v-if="item.routes.length"
                            class="route-controls">
                            <span v-for="itemRoute in item.routes"
                                :key="itemRoute.name"
                                class="icon is-small route-control"
                                @mousedown="redirect(item, itemRoute.name)">
                                <fa :icon="itemRoute.icon"
                                    size="sm"/>
                            </span>
                        </span>
                    </template>
                </enso-typeahead>
            </div>
            <a class="navbar-item"
                v-on="controlEvents"
                v-else>
                <span class="icon is-small animated fadeIn">
                    <fa icon="search"/>
                </span>
            </a>
        </template>
    </core-search>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faPencilAlt, faListUl } from '@fortawesome/free-solid-svg-icons';
import { EnsoTypeahead } from '@enso-ui/typeahead/bulma';
import { clickOutside } from '@enso-ui/directives';
import CoreSearch from '../../../core/components/navbar/Search.vue';

library.add(faEye, faPencilAlt, faListUl);

export default {
    name: 'Search',

    directives: { clickOutside },

    components: { CoreSearch, EnsoTypeahead },

    inject: ['i18n'],

    methods: {
        clear() {
            this.$refs.typeahead.clear();
        },
    },
};
</script>

<style lang="scss">
    .navbar-item.search {
        position: absolute;

        @media screen and (min-width: 1024px) {
            width: 34em;
            [dir='ltr'] & {
                left: calc(50% - 17em);
            }
            [dir='rtl'] & {
                right:calc(50% - 17em);
            }
        }
        @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 24em;
            [dir='ltr'] & {
                left: calc(50% - 13em);
            }
            [dir='rtl'] & {
                right:calc(50% - 13em);
            }
        }
        @media screen and (max-width: 767px) {
            width: 22em;
            [dir='ltr'] & {
                left: calc(50% - 11em);
            }
            [dir='rtl'] & {
                right:calc(50% - 11em);
            }
        }

        .tags.centered {
            justify-content: center;
        }

        .tag {
            padding: 0.5em;
            height: 1.6em;
            opacity: .7;
            -webkit-box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
            box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
        }
        .route-controls {
            position: absolute;
            margin-top: .15em;
            [dir='ltr'] & {
                right: 1em;
            }
            [dir='rtl'] & {
                left: 1em;
            }
            .route-control {
                z-index: 4;
                opacity: 0.8;
                cursor: pointer;
                [dir='ltr'] & {
                    margin-right: 0.2em;
                }
                [dir='rtl'] & {
                    margin-left: 0.2em;
                }
                &:hover {
                    opacity: 1;
                }
            }
        }
    }

</style>
