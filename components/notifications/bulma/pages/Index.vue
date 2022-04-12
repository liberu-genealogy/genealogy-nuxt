<template>
    <div class="columns is-centered">
        <div class="column is-two-thirds-desktop">
            <div class="level is-mobile">
                <div class="level-item"
                    v-if="notifications.length">
                    <a class="button is-success"
                        @click="readAll">
                        <span>{{ i18n("Mark all read") }}</span>
                        <span class="icon is-small">
                            <fa icon="check"/>
                        </span>
                    </a>
                </div>
                <div class="level-item">
                    <fade>
                        <a :class="['button', {'is-loading': loading}]"
                            @click="fetch">
                            <span>{{ i18n('Reload') }}</span>
                            <span class="icon is-small">
                                <fa icon="sync"/>
                            </span>
                        </a>
                    </fade>
                </div>
                <div class="level-item is-marginless"
                    v-if="notifications.length">
                    <a class="button is-warning ml-1"
                        @click="destroyAll">
                        <span>{{ i18n("Clear all") }}</span>
                        <span class="icon is-small">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </div>
            </div>
            <transition-group tag="ul"
                enter-active-class="animate__fadeIn"
                leave-active-class="animate__fadeOut">
                <li class="animate__animated"
                    v-for="(notification, index) in notifications"
                    :key="notification.id">
                    <div class="box has-background-light p-2 mb-1"
                        :class="{'is-bold': !notification.read_at}">
                        <fa :icon="notification.data.icon"
                            v-if="notification.data.icon"/>
                        <span :class="[
                                'is-clickable', {
                                    'has-text-info':
                                        notification.data.path
                                        && notification.data.path !== '#'
                                }
                            ]"
                            @click="read(notification)">
                            {{ notification.data.body }}
                        </span>
                        <span class="is-pulled-right">
                            <span class="icon is-small">
                                <fa icon="clock"
                                    size="xs"/>
                            </span>
                            {{ timeFromNow(notification.created_at) }}
                            <a class="delete ml-2 is-medium"
                                @click="destroy(notification, index)"/>
                        </span>
                        <span class="is-clearfix"/>
                    </div>
                </li>
            </transition-group>
            <h4 class="title is-5 has-text-centered"
                v-if="!loading && !notifications.length">
                {{ i18n("You don't have any notifications") }}
            </h4>
        </div>
    </div>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import debounce from 'lodash/debounce';
import { mapState } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faClock, faBell, faCheck, faTrashAlt, faSpinner, faSync,
} from '@fortawesome/free-solid-svg-icons';
import eventBus from '@enso-ui/ui/src/core/services/eventBus';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import formatDistance from '@enso-ui/ui/src/modules/plugins/date-fns/formatDistance';

library.add(faClock, faBell, faCheck, faTrashAlt, faSpinner, faSync);

export default {
    name: 'Index',

    components: { Fa, Fade },

    inject: ['errorHandler', 'http', 'i18n', 'route', 'routerErrorHandler'],

    emits: [
        'read-notification', 'read-all-notifications',
        'destroy-notification', 'destroy-all-notification',
    ],

    data: () => ({
        paginate: 200,
        notifications: [],
        offset: 0,
        loading: false,
    }),

    computed: {
        ...mapState(['user', 'meta']),
        ...mapState('layout', ['isTouch']),
    },

    created() {
        this.fetch = debounce(this.fetch, 500);
        this.fetch();
    },

    methods: {
        fetch() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            this.http.get(this.route('core.notifications.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.notifications = this.offset ? this.notifications.concat(data) : data;
                this.offset = this.notifications.length;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        read(notification) {
            this.http.patch(this.route('core.notifications.read', notification.id))
                .then(({ data }) => {
                    notification.read_at = data.read_at;
                    eventBus.$emit('read-notification', notification);

                    if (notification.data.path && notification.data.path !== '#') {
                        this.$router.push({ path: notification.data.path })
                            .catch(this.routerErrorHandler);
                    }
                }).catch(this.errorHandler);
        },
        readAll() {
            this.http.post(this.route('core.notifications.readAll'))
                .then(() => this.updateAll())
                .catch(this.errorHandler);
        },
        updateAll() {
            this.notifications.forEach(notification => {
                notification.read_at = notification.read_at || format(new Date(), 'Y-M-D H:i:s');
            });

            this.unreadCount = 0;

            eventBus.$emit('read-all-notifications');
        },
        destroyAll() {
            this.http.delete(this.route('core.notifications.destroyAll')).then(() => {
                this.notifications = [];
                eventBus.$emit('destroy-all-notifications');
            }).catch(this.errorHandler);
        },
        destroy(notification, index) {
            this.http.delete(this.route('core.notifications.destroy', notification.id)).then(() => {
                this.notifications.splice(index, 1);
                eventBus.$emit('destroy-notification', notification);
            }).catch(this.errorHandler);
        },
        timeFromNow(date) {
            return formatDistance(date);
        },
    },
};
</script>
