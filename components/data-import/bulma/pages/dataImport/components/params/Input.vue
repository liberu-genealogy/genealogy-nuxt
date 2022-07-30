<template>
    <input class="input"
        :placeholder="i18n(param.placeholder)"
        v-model="param.value">
</template>

<script>

export default {
    name: 'Input',

    inject: ['i18n'],

    props: {
        param: {
            type: Object,
            required: true,
        },
    },
};
</script>
