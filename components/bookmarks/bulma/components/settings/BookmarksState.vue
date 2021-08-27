<template>
    <core-bookmark-state>
        <template v-slot:default="{ bindings, events }">
            <div class="level is-mobile settings">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Bookmarks') }}
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
    </core-bookmark-state>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';
import CoreBookmarkState from '~/components/bookmarks/core/components/settings/BookmarksState.vue';

export default {
    name: 'BookmarksState',

    components: { CoreBookmarkState, VueSwitch },

    inject: ['i18n'],
};
</script>
