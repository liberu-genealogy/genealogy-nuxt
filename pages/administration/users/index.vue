<template>
    <div>
        <enso-table class="box is-paddingless raises-on-hover"
            id="users"
            ref="table">
            <template v-slot:avatarId="{ row }">
                <avatar class="is-24x24"
                    :user="row"/>
            </template>
            <template v-slot:destroy-button="{ icon, cssClass, row }">
                <a class="button is-small is-table-button ml-1"
                    :class="cssClass"
                    @click="deletableUser = row.id">
                    <span class="icon is-small">
                        <fa :icon="icon"/>
                    </span>
                </a>
            </template>
        </enso-table>
        <delete-modal :user-id="deletableUser"
            @close="deletableUser = null"
            @destroyed="deletableUser = null; $refs.table.fetch()"
            v-if="!!deletableUser"/>
    </div>
</template>
<router>
{
    name: 'administration.users.index'
}
</router>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from '~/components/users/bulma/pages/users/components/Avatar.vue';
import DeleteModal from '~/components/users/bulma/pages/users/components/DeleteModal.vue';

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Users',
    },

    components: { EnsoTable, Avatar, DeleteModal },

    inject: ['canAccess', 'i18n'],

    data: () => ({
        deletableUser: null,
    }),
};
</script>
