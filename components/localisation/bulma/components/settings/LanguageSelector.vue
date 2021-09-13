<template>
    <core-language-selector>
        <template v-slot:default="{ locale, languages, update, multiLanguage }">
            <div class="level is-mobile"
                v-if="multiLanguage">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Language') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item language-selector">
                        <dropdown>
                            <template v-slot:label>
                                <span class="icon">
                                    <i :class="languages[locale]"/>
                                </span>
                            </template>
                            <template v-slot:items>
                                <dropdown-item v-for="(flag, lang) in languages"
                                    :key="lang"
                                    :selected="locale === lang"
                                    @select="update(lang)">
                                    <span class="icon is-small">
                                        <i :class="flag"/>
                                    </span>
                                </dropdown-item>
                            </template>
                        </dropdown>
                    </div>
                </div>
            </div>
        </template>
    </core-language-selector>
</template>

<script>
import { Dropdown, DropdownItem } from '@enso-ui/dropdown/bulma';
import CoreLanguageSelector from '../../../core/components/settings/LanguageSelector.vue';

export default {
    name: 'LanguageSelector',

    components: { CoreLanguageSelector, Dropdown, DropdownItem },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import './flags/flags';

    .language-selector {
        .button .icon:first-child {
            margin: unset;
        }

        .dropdown .dropdown-content {
            width: 4.6em;
            .dropdown-item {
                text-align: center;
            }
        }
    }
</style>
