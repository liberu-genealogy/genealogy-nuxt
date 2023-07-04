<template>
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input :value="value"
                v-focus
                class="input"
                type="email"
                :class="{ 'is-danger': errors.has('email'), 'is-success': successful }"
                :placeholder="i18n('Email')"
                autocomplete="email"
                @input="$emit('input', $event.target.value); errors.clear('email')">
            <span class="icon is-large is-left ml-2" style="height: 100%;">
                <fa icon="envelope"/>
            </span>
            <span v-if="successful"
                class="icon is-small is-right has-text-success pr-2" style="height: 100%;">
                <fa icon="check"/>
            </span>
            <span v-if="errors.has('email')"
                class="icon is-small is-right has-text-danger">
                <fa icon="exclamation-triangle"/>
            </span>
        </div>
        <p class="has-text-danger is-size-7"
            v-if="errors.has('email')">
            {{ errors.get('email') }}
        </p>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';

library.add(faCheck, faExclamationTriangle, faEnvelope);


   const name= 'Email';

    const directives= { focus };

    const inject= ['errors', 'i18n', 'state'];

   const props= {
        value: {
            type: String,
            required: true,
        }
    };

   const computed= {
        successful() {
            return this.state.successful;
        }
    };
</script>
