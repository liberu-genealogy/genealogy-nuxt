<template>
    <div>
        <enso-table class="box is-paddingless raises-on-hover"
            id="users"
            ref="table">
            <template #avatarId="{ row }">
                <avatar class="is-24x24"
                    :user="row"/>
            </template>
            <template #destroy-button="{ icon, cssClass, row }">
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

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from './components/Avatar.vue';
import DeleteModal from './components/DeleteModal.vue';

export default {
    name: 'Index',

    components: {
        Avatar, DeleteModal, EnsoTable, Fa,
    },

    inject: ['canAccess', 'i18n'],

    data: () => ({
        deletableUser: null,
    }),
};
</script>
