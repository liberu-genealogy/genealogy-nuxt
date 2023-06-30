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


<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    meta: {
        breadcrumb: 'index';
        title: 'Tutorials';
    };

    components: { EnsoTable };
</script>