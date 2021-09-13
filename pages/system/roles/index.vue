<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="roles"
        @configure-role="$router.push({
            name: 'system.roles.configure',
            params: { role: $event.id },
        })"
        @write-config-file="toastr.success($event.message)"/>
</template>
<router>
{
    name: 'system.roles.index',
}
</router>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';

library.add([faSave, faSlidersH]);

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Roles',
    },

    components: { EnsoTable },

    inject: ['routerErrorHandler', 'toastr'],
};
</script>