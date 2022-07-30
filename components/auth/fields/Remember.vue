<template>
    <div class="field">
        <div class="control">
            <label class="checkbox">
            <input :value="modelValue"
                @change="$emit('update:modelValue', !modelValue)"
                :checked="modelValue"
                type="checkbox">
                {{ i18n('Remember me') }}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Remember',

    inject: ['i18n'],

    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },

    emits: ['update:modelValue'],
};
</script>
