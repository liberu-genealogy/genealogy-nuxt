<template>
    <core-tutorial>
        <template v-slot:default="{ itemEvents }">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Tutorial') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <a class="button is-naked"
                            v-on="itemEvents">
                            <span class="icon is-small">
                                <fa icon="question"/>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </core-tutorial>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import CoreTutorial from '../../../core/components/settings/Tutorial.vue';

library.add(faQuestion);

export default {
    name: 'Tutorial',

    components: { CoreTutorial },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import 'driver.js/dist/driver.min.css';
</style>
