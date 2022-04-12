<template>
    <core-tasks>
        <template #default="{
                dateTime, events, fetch, flagClass, loading,
                overdue, pending, tasks, visitTask, visitTasks,
            }">
            <navbar-item icon="tasks"
                :loading="loading"
                @show="fetch"
                @touch="visitTasks"
                ref="navbarItem">
                <template #sup
                    v-if="overdue > 0">
                    <span class="has-text-danger">
                        {{ overdue }}
                    </span>
                </template>
                <template #sub
                    v-if="pending > 0">
                    <span class="has-text-info">
                        {{ pending }}
                    </span>
                </template>
                <template #default>
                    <div class="task-list"
                        v-on="events">
                        <a v-for="task in tasks"
                            :key="task.id"
                            class="navbar-item"
                            @click.once="visitTask(task);$refs.navbarItem.hide()">
                            <p class="is-task">
                                <span>
                                    {{ task.name }}
                                </span>
                                <span class="icon is-small has-text-info is-clickable"
                                    v-tooltip="task.description">
                                    <fa icon="info-circle"
                                        size="xs"/>
                                </span>
                                <span class="icon task-reminder"
                                    :class="task.overdue ? 'has-text-danger' : 'has-text-success'"
                                    v-tooltip="task.reminder ? dateTime(task.reminder) : null">
                                    <fa icon="clock"
                                        v-if="task.reminder"/>
                                </span>
                                <span class="icon task-flag"
                                    :class="task.flag ? flagClass(task.flag) : null">
                                    <fa icon="flag"
                                        v-if="task.flag"/>
                                </span>
                            </p>
                        </a>
                    </div>
                    <hr v-if="tasks.length > 0"
                        class="navbar-divider">
                    <nav v-if="tasks.length > 0"
                        class="level navbar-item">
                        <div class="level-item">
                            <a class="button is-fullwidth is-small is-info"
                                @click.once="visitTasks();$refs.navbarItem.hide()">
                                <span>{{ i18n("See all") }}</span>
                                <span class="icon is-small">
                                    <fa icon="eye"/>
                                </span>
                            </a>
                        </div>
                    </nav>
                    <a v-else class="navbar-item">
                        <span v-if="loading">
                            {{ i18n("Loading...") }}
                        </span>
                        <span v-else-if="pending === 0">
                            {{ i18n("You don't have any pending tasks") }}
                        </span>
                    </a>
                </template>
            </navbar-item>
        </template>
    </core-tasks>
</template>
<script>
import { clickOutside } from '@enso-ui/directives';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEye, faClock, faFlag, faTasks,
} from '@fortawesome/free-solid-svg-icons';
import NavbarItem from '@enso-ui/ui/src/bulma/components/navbar/NavbarItem.vue';
import CoreTasks from '../../../core/components/navbar/Tasks.vue';

library.add(faEye, faTasks, faClock, faFlag);

export default {
    name: 'Tasks',

    directives: { clickOutside },

    components: { CoreTasks, Fa, NavbarItem },

    inject: ['i18n'],
};

</script>

<style lang="scss">
.navbar-item {
    .task-list {
        width: 300px;
        overflow-x: hidden;
        max-height: 400px;
        overflow-y: auto;
    }

    .is-task {
        width: 268px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .task-flag {
            position: absolute;
            right: 10px;
        }
        .task-reminder {
            position: absolute;
            right: 32px;
        }
    }
}
</style>
