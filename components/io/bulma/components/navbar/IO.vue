<template>
    <core-i-o>
        <template v-slot:default="{ events, count, imports, exports }">
            <navbar-item icon="sync-alt"
                @click="$refs.navbarItem.toggle();"
                ref="navbarItem"
                v-if="count > 0">
                <template v-slot:desktop-icon="{ icon }">
                    <span class="icon">
                        <fa :icon="icon" spin/>
                    </span>
                </template>
                <template v-slot:sup>
                    <span class="has-text-danger">
                        {{ count }}
                    </span>
                </template>
                <template v-slot:default>
                    <ul class="operation-list">
                        <li v-for="operation in imports"
                            :key="operation.id"
                            class="navbar-item">
                            <import :operation="operation"
                                v-on="events"/>
                        </li>
                        <li v-for="operation in exports"
                            :key="operation.id"
                            class="navbar-item">
                            <export :operation="operation"
                                v-on="events"/>
                        </li>
                    </ul>
                </template>
            </navbar-item>
        </template>
    </core-i-o>
</template>

<script>
import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faDatabase } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from '~/components/ui/bulma/components/navbar/NavbarItem.vue';
import CoreIO from '../../../core/components/navbar/IO.vue';
import Import from './io/Import.vue';
import Export from './io/Export.vue';

library.add(faSyncAlt, faDatabase);

export default {
    name: 'IO',

    directives: { clickOutside },

    components: { CoreIO, Import, Export, NavbarItem },
};
</script>

<style lang="scss">
.operation-list {
    padding: 0 1rem;

    li {
        padding: 0.375rem 0 !important;
    }

    li:not(:last-child) {
        border-bottom: 1px solid lightgrey;
    }

    width: 350px;
    overflow-x: hidden;
    max-height: 500px;
    overflow-y: auto;

    .one-line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 293px;
    }
    
    .progress.is-xsmall {
        height: 0.5rem;
    }

    .level.is-mobile .level-item:not(:last-child) {
        margin-right: 0;
    }
}
</style>
