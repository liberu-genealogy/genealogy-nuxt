<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="tutorials">
        <template v-slot:placement="{ column, row }">
            <span class="tag is-table-tag is-info">
                {{ column.enum._get(row.placement) }}
            </span>
        </template>
    </enso-table>
</template>
<router>
{
    name: 'system.tutorials.index',
}
</router>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Tutorials',
    },

    components: { EnsoTable },
};
</script>