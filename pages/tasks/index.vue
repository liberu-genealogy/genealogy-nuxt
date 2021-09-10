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
            <template v-slot:name="{ row }">
                <span>
                    {{ row.name }}
                </span>
                <span class="icon is-small has-text-info is-clickable"
                    v-tooltip="row.description">
                    <fa icon="info-circle"
                        size="xs"/>
                </span>
            </template>
            <template v-slot:flag="{ row, column }">
                <v-popover trigger="click"
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
                    <template v-slot:popover>
                        <flags v-model="row.flag"
                            @input="
                                update(row.id, 'flag', row.flag);
                                $refs[`flag-${row.id}`].hide()
                            "
                            v-if="isOpen(`flag-${row.id}`)"/>
                    </template>
                </v-popover>
            </template>
            <template v-slot:reminder="{ row }">
                <v-popover trigger="click"
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
                    <template v-slot:popover>
                        <enso-datepicker class="reminder-picker"
                            v-click-outside="() => {
                                update(row.id, 'reminder', row.rawReminder);
                                $refs[`reminder-${row.id}`].hide();
                            }"
                            v-model="row.rawReminder"
                            format="Y-m-d H:i:s"
                            time
                            :alt-format="dateFormat"
                            v-if="isOpen(`reminder-${row.id}`)"/>
                    </template>
                </v-popover>
            </template>
            <template v-slot:allocatedTo="{ row }">
                <v-popover trigger="click"
                    :ref="`allocated_to-${row.id}`"
                    v-if="canChangeAllocation">
                    <avatar class="is-24x24 is-clickable"
                        :user="row.allocatedTo"/>
                    <template v-slot:popover>
                        <div class="allocated-to"
                            v-if="isOpen(`allocated_to-${row.id}`)">
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
                </v-popover>
                <avatar class="is-24x24"
                    :user="row.allocatedTo"
                    v-else/>
            </template>
            <template v-slot:completed="{ row }">
                <vue-switch class="is-medium"
                    v-model="row.completed"
                    @input="update(row.id, 'completed', row.completed)"/>
            </template>
            <template v-slot:createdBy="{ row: { createdBy } }">
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
<router>
{
    name: 'tasks.index',
}
</router>

<script>
import { mapState } from 'vuex';
import { FilterState } from '@enso-ui/filters/renderless';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { EnsoSelect } from '@enso-ui/select/bulma';
import VueSwitch from '@enso-ui/switch/bulma';
import { EnsoDatepicker } from '@enso-ui/datepicker/bulma';
import Avatar from '~/components/users/bulma/pages/users/components/Avatar.vue';
import { faClock, faInfoCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { VTooltip, VPopover } from 'v-tooltip';
import { clickOutside } from '@enso-ui/directives';
import Filters from '~/components/tasks/bulma/pages/tasks/components/Filters.vue';
import Flags from '~/components/tasks/bulma/pages/tasks/components/Flags.vue';

library.add(faClock, faInfoCircle, faCog);

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Tasks',
    },

    inject: ['i18n', 'route', 'toastr', 'errorHandler'],

    directives: { tooltip: VTooltip, clickOutside },

    components: {
        Avatar,
        EnsoDatepicker,
        EnsoTable,
        FilterState,
        VueSwitch,
        VPopover,
        Filters,
        Flags,
        EnsoSelect,
    },

    data: () => ({
        apiVersion: 1.1,
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
            dateInterval: 'today',
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
            this.$axios.patch(this.route('tasks.update', { task: id }), {
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

        isOpen(ref) {
            return this.$refs[ref]?.isOpen;
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
