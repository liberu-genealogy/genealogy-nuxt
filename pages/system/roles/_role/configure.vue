<template>
    <div class="columns is-centered">
        <div class="column is-half is-three-fifths-desktop is-full-touch">
            <div class="animated fadeIn"
                v-if="data">
                <checkbox-manager class="is-rounded mt-3"
                    :title="`${i18n('Permissions')}: ${data.role.display_name}`"
                    v-model="data.rolePermissions"
                    :items="data.permissions">
                    <template v-slot:item="{ item }">
                        <div class="level permission is-hoverable p-2 is-mobile">
                            <div class="level-left">
                                <div class="level-item">
                                    <label class="checkbox">
                                        <input type="checkbox"
                                            :id="item.id"
                                            :value="item.id"
                                            v-model="data.rolePermissions">
                                        {{ item.description }}
                                    </label>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <span class="tag is-small is-info is-bold mr-2"
                                        v-if="item.isDefault">
                                        {{ i18n('Default') }}
                                    </span>
                                    <span class="tag is-small is-bold"
                                        :class="cssClass(item)">
                                        {{ item.type }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>
                </checkbox-manager>
                <button class="button is-success mt-3 is-pulled-right"
                    @click="update"
                    :disabled="!canAccess('system.roles.permissions.set')">
                    {{ i18n("Update") }}
                </button>
                <div class="is-clearfix"/>
            </div>
        </div>
    </div>
</template>
<router>
{
    name: 'system.roles.configure',
}
</router>

<script>
import { mapState } from 'vuex';
import cssClass from '~/utils/permission';
import { CheckboxManager } from '@enso-ui/checkbox/bulma';

export default {
    // path: ':role/configure',
    meta: {
        breadcrumb: 'configure',
        title: 'Configure Role',
    },

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'toastr'],

    components: { CheckboxManager },

    data: () => ({
        data: null,
    }),

    computed: {
        ...mapState(['enums']),
    },

    created() {
        this.fetch();
    },

    methods: {
        cssClass(item) {
            return cssClass(this.enums.permissionTypes, item);
        },
        fetch() {
            this.$axios.get(this.route('system.roles.permissions.get', this.$route.params.role))
                .then(({ data }) => (this.data = data))
                .catch(this.errorHandler);
        },
        update() {
            this.$axios.post(
                this.route('system.roles.permissions.set', this.$route.params.role),
                { rolePermissions: this.data.rolePermissions },
            ).then(({ data }) => this.toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>

<style lang="scss">
    .level.permission .level-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
