<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="languages">
        <template v-slot:flag="{ row }">
            <span class="icon is-small">
                <i :class="row.flag"/>
            </span>
        </template>
    </enso-table>
</template>
<router>
{
    name: 'system.localisation.index',
}
</router>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';

library.add(faEdit);

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Localisation',
    },

    components: { EnsoTable },
};
</script>
