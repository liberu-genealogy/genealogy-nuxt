<template>
    <div class="field is-horizontal">
        <div class="field-label is-normal"
            v-if="param.label">
            <label class="label">
                {{ i18n(param.label) }}
            </label>
        </div>
        <div class="field-body">
            <div class="field">
                <component :is="component"
                    :param="param"/>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ucfirst } from '@enso-ui/strings';
import Checkbox from './params/Checkbox.vue';
import Input from './params/Input.vue';
import Date from './params/Date.vue';
import Select from './params/Select.vue';

library.add(faFilter);

export default {
    name: 'Param',

    components: {
        Checkbox, Input, Date, Select,
    },

    inject: ['i18n'],

    props: {
        param: {
            type: Object,
            required: true,
        },
    },
    
    computed: {
        component() {
            return ucfirst(this.param.type);
        },
    },
};
</script>

