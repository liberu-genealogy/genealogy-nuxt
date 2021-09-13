<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="companies"
        @clicked="visit">
        <template v-slot:status="{ column, row }">
            <span class="tag is-table-tag"
                :class="status(column, row)">
                {{ column.enum._get(row.status) }}
            </span>
        </template>
    </enso-table>
</template>
<router>
{
    name: 'administration.companies.index',
}
</router>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Companies',
    },

    components: { EnsoTable },

    methods: {
        visit({ row }) {
            window.open(row.website, '_blank').focus();
        },
        status(column, { status }) {
            switch (`${status}`) {
            case column.enum.Active:
                return 'is-success';
            case column.enum.Overdue:
            case column.enum.Litigation:
                return 'is-warning';
            case column.enum.Insolvent:
            case column.enum.Deregistered:
                return 'is-danger';
            default:
                throw Error(`Unknown status: ${status}`);
            }
        },
    },
};
</script>
