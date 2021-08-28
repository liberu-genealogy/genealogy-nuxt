<template>
    <core-menu-organizer>
        <template v-slot:default="{ bindings, events }">
            <div class="level is-mobile"
                v-if="canAccess('system.menus.organize')">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Organize Menus') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <vue-switch class="is-medium"
                            v-bind="bindings"
                            v-on="events"/>
                    </div>
                </div>
            </div>
        </template>
    </core-menu-organizer>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';
import CoreMenuOrganizer from '../../../core/components/settings/MenuOrganizer.vue';

export default {
    name: 'MenuOrganizer',

    components: { CoreMenuOrganizer, VueSwitch },

    inject: ['canAccess', 'i18n'],
};
</script>
