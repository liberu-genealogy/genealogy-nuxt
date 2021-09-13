<template>
    <core-settings-control>
        <template v-slot:default="{ toggle }">
            <a class="navbar-item settings"
                @click="toggle">
                <span class="icon">
                    <fa icon="cogs"/>
                </span>
            </a>
        </template>
    </core-settings-control>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import CoreSettingsControl from '../../../core/components/navbar/SettingsControl.vue';

library.add(faCogs);

export default {
    name: 'SettingsControl',

    components: { CoreSettingsControl },
};
</script>
