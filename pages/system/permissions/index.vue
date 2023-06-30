<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="permissions">
        <template v-slot:type="{ column, row }">
            <span class="tag is-table-tag"
                :class="cssClass(column.enum, row)">
                {{ row.type }}
            </span>
        </template>
    </enso-table>
</template>


<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';
import cssClass from '~/utils/permission';


    meta: {
        breadcrumb: 'index';
        title: 'Permissions';
    };

    components: { EnsoTable };

    methods: {
        function cssClass(columnEnum, row) {
            return cssClass(columnEnum, row);
        };
    };
</script>
