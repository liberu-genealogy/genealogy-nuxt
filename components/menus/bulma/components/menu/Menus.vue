<template>
    <core-menus v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{ menus, isActive, parentMenuEvents, organizeBindings, organizeEvents }">
            <ul class="menu-list">
                <draggable v-bind="organizeBindings"
                    handle=".handle"
                    v-on="organizeEvents">
                    <transition-group name="menu-list">
                        <li v-for="menu in menus"
                            :key="menu.name">
                            <menu-item :menu="menu"/>
                            <menus :menus="menu.children"
                                :collapsed="!menu.expanded"
                                v-on="parentMenuEvents"
                                v-if="menu.children"/>
                        </li>
                    </transition-group>
                </draggable>
            </ul>
        </template>
    </core-menus>
</template>

<script>
import Draggable from 'vuedraggable';
import CoreMenus from '../../../core/components/menu/Menus.vue';
import MenuItem from './MenuItem.vue';

export default {
    name: 'Menus',

    components: { CoreMenus, MenuItem, Draggable },
};
</script>

<style lang="scss" scoped>
    .menu-list {
        transition: height .333s ease;
        display: block;
        overflow-y: hidden;
        overflow-x: hidden;

        li > ul {
            [dir='ltr'] & {
                margin: 0 0 0 .5rem;
                padding-left: 0;
            }
            [dir='rtl'] & {
                margin: 0 .5rem 0 0;
                padding-right: 0;
            }
        }
    }

    .menu-list-move {
        transition: transform 0.5s;
    }
</style>
