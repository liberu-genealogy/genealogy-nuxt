<template>
    <div class="wrapper">
        <filters :filters="filters"
            :intervals="intervals"
            :params="params"
            v-if="ready"/>
        <enso-table class="box is-paddingless raises-on-hover"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
            @reset="$refs.filterState.reset()"
            id="tasks"
            ref="table">
            <template #name="{ row }">
                <span>
                    {{ row.name }}
                </span>
                <span class="icon is-small has-text-info is-clickable"
                    v-tooltip="row.description">
                    <fa icon="info-circle"
                        size="xs"/>
                </span>
            </template>
            <template #flag="{ row, column }">
                <dropdown :triggers="['click']"
                    :ref="`flag-${row.id}`">
                    <span class="icon is-clickable"
                        :class="`has-text-${column.enum._get(row.flag).toLowerCase()}`"
                        v-if="column.enum._get(row.flag)">
                        <fa icon="flag"/>
                    </span>
                    <span class="icon is-naked is-clickable is-small"
                        v-else>
                        <fa icon="cog"
                            size="xs"/>
                    </span>
                    <template #popper>
                        <flags v-model="row.flag"
                            @update:model-value="
                                update(row.id, 'flag', row.flag);
                                $refs[`flag-${row.id}`].hide()
                            "/>
                    </template>
                </dropdown>
            </template>
            <template #reminder="{ row }">
                <dropdown :triggers="['click']"
                    :auto-hide="false"
                    :ref="`reminder-${row.id}`">
                    <span class="icon is-clickable"
                        :class="row.overdue ? 'has-text-danger' : 'has-text-success'"
                        v-tooltip="row.reminder"
                        v-if="row.reminder">
                        <fa icon="clock"/>
                    </span>
                    <span class="icon is-naked is-clickable is-small"
                        v-else>
                        <fa icon="cog"
                            size="xs"/>
                    </span>
                    <template #popper>
                        <enso-datepicker class="reminder-picker"
                            v-click-outside="() => {
                                update(row.id, 'reminder', row.rawReminder);
                                $refs[`reminder-${row.id}`].hide();
                            }"
                            v-model="row.rawReminder"
                            format="Y-m-d H:i:s"
                            time
                            :alt-format="dateFormat"/>
                    </template>
                </dropdown>
            </template>
            <template #allocatedTo="{ row }">
                <dropdown :triggers="['click']"
                    :ref="`allocated_to-${row.id}`"
                    v-if="canChangeAllocation">
                    <avatar class="is-24x24 is-clickable"
                        :user="row.allocatedTo"/>
                    <template #popper>
                        <div class="allocated-to">
                            <enso-select v-model="row.allocatedTo.id"
                                @select="
                                    update(row.id, 'allocated_to', row.allocatedTo.id);
                                    $refs[`allocated_to-${row.id}`].hide();
                                "
                                source="tasks.users"
                                disable-clear
                                label="person.name"/>
                        </div>
                    </template>
                </dropdown>
                <avatar class="is-24x24"
                    :user="row.allocatedTo"
                    v-else/>
            </template>
            <template #completed="{ row }">
                <div class="is-flex is-justify-content-center">
                    <vue-switch class="is-medium"
                        v-model="row.completed"
                        @update:model-value="update(row.id, 'completed', row.completed)"/>
                </div>
            </template>
            <template #createdBy="{ row: { createdBy } }">
                <avatar class="is-24x24"
                    :user="createdBy"/>
            </template>
        </enso-table>
        <filter-state :api-version="apiVersion"
            name="taskFilters"
            :filters="filters"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { FilterState } from '@enso-ui/filters/renderless';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { EnsoSelect } from '@enso-ui/select/bulma';
import VueSwitch from '@enso-ui/switch/bulma';
import { EnsoDatepicker } from '@enso-ui/datepicker/bulma';
import { Avatar } from '@enso-ui/users';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faInfoCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'v-tooltip';
import { clickOutside } from '@enso-ui/directives';
import Filters from './components/Filters.vue';
import Flags from './components/Flags.vue';

library.add(faClock, faInfoCircle, faCog);

export default {
    name: 'Index',

    directives: { clickOutside },

    components: {
        Avatar,
        EnsoDatepicker,
        EnsoTable,
        FilterState,
        VueSwitch,
        Dropdown,
        Fa,
        Filters,
        Flags,
        EnsoSelect,
    },

    inject: ['http', 'i18n', 'route', 'toastr', 'errorHandler'],

    data: () => ({
        apiVersion: 2,
        ready: false,
        filters: {
            tasks: {
                completed: false,
                flag: null,
                allocated_to: null,
            },
        },
        intervals: {
            tasks: {
                reminder: {
                    min: null,
                    max: null,
                },
            },
        },
        params: {
            dateFilter: 'today',
            overdue: null,
        },
    }),

    computed: {
        ...mapState(['enums', 'user', 'meta']),
        canChangeAllocation() {
            return [
                this.enums.roles.Admin, this.enums.roles.Supervisor,
            ].includes(`${this.user.role.id}`);
        },
        dateFormat() {
            return this.meta.dateTimeFormat.split(':s').shift();
        },
    },

    methods: {
        update(id, attribute, value) {
            this.http.patch(this.route('tasks.update', { task: id }), {
                [attribute]: value,
            }).then(({ data: { message } }) => {
                this.toastr.success(message);
                this.$refs.table.fetch();
            }).catch(error => {
                if (error.response && error.response.status === 422) {
                    this.toastr.warning(this.i18n(error.response.data.message));
                } else {
                    this.errorHandler(error);
                }
            });
        },
    },
};
</script>

<style lang="scss">
.allocated-to {
    width: 250px;

    .dropdown.vue-dropdown {
        .dropdown-trigger .button.input .angle {
            right: 0.5rem;
        }

        .dropdown-menu .dropdown-content .dropdown-item .icon.selected {
            right: 0.6rem;
        }
    }
}
.reminder-picker {
    .input {
        width: 220px;
    }
}
</style>
