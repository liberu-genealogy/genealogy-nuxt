<template>
    <operation v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:status="{ operation }">
            {{ enums.importStatuses._get(operation.status) }}
        </template>
        <template v-slot:body="{ operation }">
            <p class="one-line">
                <span class="has-text-weight-bold">
                    {{ i18n('file') }}
                </span> {{ operation.payload.filename }}
            </p>
            <div v-if="operation.payload.sheet">
                <p class="one-line">
                    <span class="has-text-weight-bold">
                        {{ i18n('sheet') }}
                    </span> {{ operation.payload.sheet }}
                </p>
            </div>
        </template>
        <template v-slot:info="{ operation }">
            <p class="is-flex is-align-items-center">
                <span class="icon has-text-success">
                    <fa icon="check"/>
                </span>
                <span class="has-text-weight-bold has-text-success">
                    {{ shortNumber(operation.payload.successful) }}
                </span>
                <span class="icon has-text-danger">
                    <fa icon="times"/>
                </span>
                <span class="has-text-weight-bold has-text-danger">
                    {{ shortNumber(operation.payload.failed) }}
                </span>
            </p>
        </template>
    </operation>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Operation from './Operation.vue';

library.add(faCheck, faTimes);

export default {
    name: 'Import',

    components: { Operation },

    inject: ['i18n'],

    computed: mapState(['enums']),

    methods: {
        shortNumber(value) {
            return this.$shortNumber(value);
        },
    },
};
</script>
