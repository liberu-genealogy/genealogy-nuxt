<template>
    <div class="field">
        <div class="control">
            <label class="checkbox">
            <input :value="value"
                @change="$emit('input', !value)"
                :checked="value"
                type="checkbox">
                {{ i18n('Remember me') }}
            </label>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    name: 'Remember',

    inject: ['i18n'],

    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
