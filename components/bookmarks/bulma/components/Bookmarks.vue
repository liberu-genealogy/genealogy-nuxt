<template>
    <div class="bookmarks">
        <core-bookmarks>
            <template #default="{
                bookmarks, hasClear, matches, isExcluded, stickBindings,
                bookmarkBindings, removeBindings, bookmarkEvents,
                reorderBindings, reorderEvents, clearBindings,
                }">
                <span class="control">
                    <a class="tag is-warning icon mr-1"
                        v-on="clearBindings"
                        v-if="hasClear">
                        <fa icon="trash-alt"/>
                    </a>
                </span>
                <draggable class="field is-grouped bookmark-items no-scrollbars"
                    v-bind="reorderBindings"
                    v-on="reorderEvents">
                    <template #item="{ element }">
                        <span class="control"
                            v-bind="bookmarkBindings(element)">
                            <span class="tags has-addons">
                                <a :class="['tag is-bold', {'is-link': matches($route, element)}]"
                                    v-on="bookmarkEvents(element)">
                                    <span>
                                        {{ i18n(element.meta.title) }}
                                    </span>
                                    <span class="icon is-small has-text-danger"
                                        v-if="element.state">
                                        <fa icon="circle"
                                            size="xs"/>
                                    </span>
                                </a>
                                <a class="tag is-success check"
                                    v-on="stickBindings(element)"
                                    v-if="!element.sticky && !isExcluded(element)">
                                    <span class="icon is-small">
                                        <fa icon="check"/>
                                    </span>
                                </a>
                                <a class="tag is-delete"
                                    v-on="removeBindings(element)"
                                    v-if="bookmarks.length > 1 && !isExcluded(element)"/>
                            </span>
                        </span>
                    </template>
                </draggable>
            </template>
        </core-bookmarks>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrashAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import CoreBookmarks from '../../core/components/Bookmarks.vue';

library.add(faCheck, faTrashAlt, faCircle);

export default {
    name: 'Bookmarks',

    components: { Fa, CoreBookmarks, Draggable },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

    .bookmarks {
        position: fixed;
        top: $navbar-height;
        width: 100vw;
        display: flex;
        padding: 0.2em;
        -webkit-box-shadow: 1px 0 1px hsla(0,0%,4%,.65);
        box-shadow: 1px 0 1px hsla(0,0%,4%,.65);
        z-index: 2;
        [dir='ltr'] & {
            transition: margin-left .5s, width .5s;
            margin-left: 0;
        }
        [dir='rtl'] & {
            transition: margin-right .5s, width .5s;
            margin-right: 0;
        }

        &.with-sidebar {
            width: calc(100vw - #{$sidebar-width});
            [dir='ltr'] & {
                margin-left: $sidebar-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-width;
            }

            &.sidebar-collapsed {
                width: calc(100vw - #{$sidebar-collapsed-width});
                [dir='ltr'] & {
                    margin-left: $sidebar-collapsed-width;
                }
                [dir='rtl'] & {
                    margin-right: $sidebar-collapsed-width;
                }
            }
        }

        a.tag:hover {
            text-decoration: none;
        }

        .tag.check {
            [dir='ltr'] & {
                margin-left: 0.05em;
            }
            [dir='rtl'] & {
                margin-right: 0.05em;
            }
        }

        .bookmark-items {
            position: relative;
            overflow-x: auto;
            overflow-y: hidden;
            margin-bottom: 0;

            .control:not(:last-child) {
                [dir='ltr'] & {
                    margin-right: .25em;
                }
                [dir='rtl'] & {
                    margin-left: .25em;
                }
            }
        }
    }

</style>
