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
