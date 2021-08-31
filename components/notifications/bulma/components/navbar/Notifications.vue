<template>
    <core-notifications>
        <template v-slot:default="{
                events, fetch, loading, notifications, read,
                readAll, timeFromNow, unread, visitNotifications
            }">
            <navbar-item icon="bell"
                :loading="loading"
                @click="$refs.navbarItem.toggle(); fetch()"
                @touch="visitNotifications"
                ref="navbarItem">
                <template v-slot:sup
                    v-if="unread > 0">
                    <span class="has-text-danger">
                        {{ unread }}
                    </span>
                </template>
                <template v-slot:default>
                    <div class="notification-list"
                        v-on="events">
                        <a v-for="notification in notifications"
                            :key="notification.id"
                            class="navbar-item"
                            @click="read(notification)">
                            <p class="is-notification"
                                :class="{
                                    'has-text-grey-light': notification.read_at,
                                    'is-bold': !notification.read_at,
                                }">
                                <fa v-if="notification.data.icon"
                                    :icon="notification.data.icon"/>
                                {{ notification.data.body }}
                            </p>
                            <p>
                                <small :class="{
                                    'has-text-grey-light': notification.read_at,
                                    'has-text-info': !notification.read_at,
                                }">
                                    {{ timeFromNow(notification.created_at) }}
                                </small>
                            </p>
                        </a>
                    </div>
                    <hr v-if="notifications.length > 0"
                        class="navbar-divider">
                    <nav v-if="notifications.length > 0"
                        class="level navbar-item">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="button is-small is-info ml-1"
                                    @click="visitNotifications();$refs.navbarItem.hide()">
                                    <span>{{ i18n("See all") }}</span>
                                    <span class="icon is-small">
                                    <fa icon="eye"/>
                                </span>
                                </a>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <a class="button is-small is-success"
                                    @click="readAll">
                                    <span>{{ i18n("Mark all as read") }}</span>
                                    <span class="icon is-small">
                                    <fa icon="check"/>
                                </span>
                                </a>
                            </div>
                        </div>
                    </nav>
                    <a v-else class="navbar-item">
                    <span v-if="unread || loading">
                        {{ i18n("Loading...") }}
                    </span>
                        <span v-else-if="!unread">
                        {{ i18n("You don't have any notifications") }}
                    </span>
                    </a>
                </template>
            </navbar-item>
        </template>
    </core-notifications>
</template>

<script>

import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBell, faCheck, faEye, faCogs, faQuestion, faEnvelope, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import NavbarItem from '~/components/ui/bulma/components/navbar/NavbarItem.vue';
import CoreNotifications from '../../../core/components/navbar/Notifications.vue';

library.add(faBell, faCheck, faEye, faCogs, faQuestion, faEnvelope, faFileExcel);

export default {
    name: 'Notifications',

    directives: { clickOutside },

    components: { CoreNotifications, NavbarItem },

    inject: ['i18n'],
};

</script>

<style lang="scss">
.navbar-item {
    .notification-list {
        width: 300px;
        overflow-x: hidden;
        max-height: 400px;
        overflow-y: auto;
    }

    .is-notification {
        white-space: normal;
        width: 268px;
        overflow-x: hidden;
    }
}
</style>
