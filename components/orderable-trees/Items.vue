<template>
    <draggable class="drag-area"
        :list="items"
        :animation="150"
        :group="{ name: 'items', put: unique }"
        :move="checkMove"
        handle=".dropdown-item"
        :disabled="state.query !== '' || !!state.item"
        @change="change"
        @end="endDragging"
        @start="startDragging"
        tag="ul">
        <item v-for="item in items"
            :item="item"
            :key="`${item.group}-${item.id}`"
            :splice="splice"
            v-on="$listeners">
            <template v-slot:item="props">
                <slot name="item"
                    v-bind="props"/>
            </template>
            <template v-slot:controls="props">
                <slot name="controls"
                    v-bind="props"/>
            </template>
        </item>
    </draggable>
</template>

<script>
import Draggable from 'vuedraggable';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'Items',

    components: { Draggable, Item: () => import('./Item.vue') },

    inject: ['state'],

    props: {
        items: {
            type: Array,
            required: true,
        },
        parentId: {
            type: Number,
            default: null,
        },
    },
    setup() {
        function checkMove({ draggedContext: { element }, relatedContext }) {
            return !relatedContext.element
                || relatedContext.element.group === element.group;
        }
        function change(event) {
            if (event.moved) {
                this.move(event.moved);
            } else if (event.added) {
                this.move(event.added);
            }
        }
        function endDragging() {
            this.state.dragging = null;
        }
        function splice(item) {
            const index = this.items.findIndex(({ id }) => id === item.id);
            this.items.splice(index, 1);
        }
        function move({ element, newIndex }) {
            newIndex++;
            const payload = { ...element, parentId: this.parentId, newIndex };
            this.$emit('moved', payload);
        }
        function startDragging(event) {
            if (this.state.selected) {
                this.state.selected.selected = false;
                this.state.selected = null;
            }
            this.state.dragging = event.item.__vue__.$options.propsData.item;
        }
        function unique(to) {
            const instanceProps = to.el.__vue__.$options.propsData;
            const items = instanceProps.list || instanceProps.items;
            return !items.some(item => item.name === this.state.dragging.name);
        }
    }
};
</script>
