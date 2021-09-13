<template>
    <core-theme-selector>
        <template v-slot:default="{ itemEvents, multiTheme }">
            <div class="level is-mobile"
                v-if="multiTheme">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Theme') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <a class="button is-naked"
                            v-on="itemEvents">
                            <span class="icon is-small">
                                <fa icon="lightbulb"/>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </core-theme-selector>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CoreThemeSelector from '~/components/themes/core/ThemeSelector.vue';

library.add(faLightbulb);

export default {
    name: 'ThemeSelector',

    components: { CoreThemeSelector },

    inject: ['i18n'],
};
</script>
