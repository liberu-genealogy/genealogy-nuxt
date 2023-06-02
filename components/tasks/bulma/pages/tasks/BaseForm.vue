<template>
    <enso-form class="box form-box has-background-light raises-on-hover">
        <template v-slot:flag="{field, errors}">
            <div class="field">
                <label class="label">
                    {{ i18n(field.label) }}
                </label>
                <div class="has-background-white is-paddingless">
                    <flags v-model="field.value"/>
                </div>
                <p class="help is-danger"
                    v-if="errors.has(field.name)">
                    {{ errors.get(field.name) }}
                </p>
            </div>
        </template>
    </enso-form>
</template>
<script>
import { EnsoForm } from '@enso-ui/forms/bulma';
import Flags from './components/Flags.vue';

export default {
    name: 'BaseForm',

    components: { EnsoForm, Flags },

    inject: ['i18n'],
};
</script>
