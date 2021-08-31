<template>
    <div>
        <button class="button is-fullwidth"
            :class="{ 'is-loading': loading }"
            @click="$emit('reload')">
            <span>
                {{ i18n('Reload') }}
            </span>
            <span class="icon">
                <fa icon="sync-alt"/>
            </span>
        </button>
        <enso-date-filter class="box raises-on-hover mt-3"
            value="today"
            @update="filters.interval = $event"/>
        <div class="box p-2 raises-on-hover has-background-light">
            <p class="has-text-centered">
                <strong>{{ i18n('What') }}</strong>
            </p>
            <select-filter multiple
                source="system.roles.options"
                :placeholder="i18n('Roles')"
                v-model="filters.roleIds"/>
            <select-filter multiple
                source="administration.users.options"
                label="person.name"
                :placeholder="i18n('Authors')"
                v-model="filters.userIds"/>
            <select-filter multiple
                :options="enums.loggableEvents._select()"
                :placeholder="i18n('Events')"
                v-model="filters.events"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { EnsoDateFilter, EnsoSelectFilter as SelectFilter } from '@enso-ui/filters/bulma';

export default {
    name: 'Filters',
    components: { EnsoDateFilter, SelectFilter },
    inject: ['i18n'],
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        filters: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState(['enums']),
    },
    watch: {
        filters: {
            handler() {
                this.$emit('reload');
            },
            deep: true,
        },
    },
};
</script>