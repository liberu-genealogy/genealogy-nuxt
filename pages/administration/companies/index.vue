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
import { ref, computed, useStore } from 'vue';

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Companies'
    },
    components: { EnsoTable },
    setup() {
        function visit({row}) {
            window.open(row.website, '_blank').focus();
        }
        function status(column, { status }) {
            switch (`${status}`) {
                case column.enum.Active:
                    return 'is-success';
                    break;
                case column.enum.Overdue:
                    break;
                case column.enum.Litigation:
                    return 'is-warning';
                    break;
                case column.enum.Insolvent:
                    break;
                case column.enum.Deregistered:
                    return 'is-danger';
                    break;
                default:
                    throw Error(`Unknown status: ${status}`);
                    break;
            }
        }
    }
}

</script>
