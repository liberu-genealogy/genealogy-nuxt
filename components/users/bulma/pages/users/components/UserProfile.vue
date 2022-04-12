<template>
    <div class="box has-background-light p-5 raises-on-hover"
        v-if="profile">
        <h4 class="title is-4 has-text-centered">
            <span class="icon">
                <fa icon="user"
                    size="xs"/>
            </span>
            {{ profile.person.name }}
            <span v-if="profile.person.appellative">
                ({{ profile.person.appellative }})
            </span>
        </h4>
        <divider class="my-2"/>
        <div class="columns mt-3">
            <div class="column">
                <avatar class="is-128x128"
                    :user="isSelfVisiting ? user : profile"/>
                <div class="field is-grouped is-justify-content-center mt-3">
                    <p class="control">
                        <a class="button is-primary"
                            v-if="isSelfVisiting"
                            @click="generateAvatar">
                            <span class="icon">
                                <fa icon="sync-alt"/>
                            </span>
                            <span>
                                {{ i18n('Avatar') }}
                            </span>
                        </a>
                    </p>
                    <p class="control">
                        <enso-uploader @upload-successful="updateAvatar"
                            :url="route('core.avatars.store')"
                            file-key="avatar"
                            v-if="isSelfVisiting">
                            <template #control="{ controlEvents }">
                                <a class="button is-info"
                                    v-on="controlEvents">
                                    <span class="icon">
                                        <fa icon="upload"/>
                                    </span>
                                    <span>
                                        {{ i18n('Avatar') }}
                                    </span>
                                </a>
                            </template>
                        </enso-uploader>
                    </p>
                    <p class="control"
                        v-if="
                            !isWebview
                            && !isSelfVisiting
                            && canAccess('core.impersonate.start')
                            && !impersonating
                        ">
                        <a class="button is-warning"
                            @click="startImpersonating">
                            <span class="icon">
                                <fa icon="user-circle"/>
                            </span>
                            <span>
                                {{ i18n('Impersonate') }}
                            </span>
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-warning"
                            @click="$router.push({
                                name: 'administration.users.edit',
                                params: { user: profile.id },
                            }).catch(routerErrorHandler)"
                            v-if="canAccess('administration.users.edit')">
                            <span class="icon">
                                <fa icon="pencil-alt"/>
                            </span>
                            <span>
                                {{ i18n('Edit') }}
                            </span>
                        </a>
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="columns is-mobile is-multiline details mt-3">
                    <div class="column is-one-third has-text-right py-1 px-2">
                        <strong>{{ i18n('Group') }}:</strong>
                    </div>
                    <div class="column is-two-thirds py-1 px-2">
                        {{ profile.group.name }}
                    </div>
                    <div class="column is-one-third has-text-right py-1 px-2">
                        <strong>{{ i18n('Role') }}:</strong>
                    </div>
                    <div class="column is-two-thirds py-1 px-2">
                        {{ profile.role.name }}
                    </div>
                    <div class="column is-one-third has-text-right py-1 px-2">
                        <strong>{{ i18n('Email') }}:</strong>
                    </div>
                    <div class="column is-two-thirds py-1 px-2">
                        {{ profile.email }}
                    </div>
                    <div class="column is-one-third has-text-right py-1 px-2">
                        <strong>{{ i18n('Phone') }}:</strong>
                    </div>
                    <div class="column is-two-thirds py-1 px-2">
                        {{ profile.person.phone }}
                    </div>
                    <div class="column is-one-third has-text-right py-1 px-2">
                        <strong>{{ i18n('Birthday') }}:</strong>
                    </div>
                    <div class="column is-two-thirds py-1 px-2">
                        {{ dateFormat(profile.person.birthday) }}
                    </div>
                </div>
            </div>
        </div>
        <divider/>
        <div class="level is-mobile mt-4">
            <div class="level-item has-text-centered is-flex-direction-column has-right-border">
                <p class="subtitle is-4">
                    {{ profile.loginCount }}
                </p>
                <p class="subtitle is-5">
                    {{ i18n('logins') }}
                </p>
            </div>
            <div class="level-item has-text-centered is-flex-direction-column">
                <p class="subtitle is-4">
                    {{ profile.actionLogCount }}
                </p>
                <p class="subtitle is-5">
                    {{ i18n('actions') }}
                </p>
            </div>
            <div class="level-item has-text-centered is-flex-direction-column has-left-border">
                <p class="subtitle is-4">
                    {{ profile.rating }}
                </p>
                <p class="subtitle is-5">
                    {{ i18n('rating') }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUser, faUserCircle, faSyncAlt, faTrashAlt, faUpload, faSignOutAlt, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import { EnsoUploader } from '@enso-ui/uploader/bulma';
import eventBus from '@enso-ui/ui/src/core/services/eventBus';
import Divider from '@enso-ui/divider';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';

library.add(faUser, faUserCircle, faSyncAlt, faTrashAlt, faUpload, faSignOutAlt, faPencilAlt);

export default {
    name: 'UserProfile',

    components: { Avatar, Divider, Fa, EnsoUploader },

    inject: [
        'canAccess', 'errorHandler', 'http', 'i18n',
        'route', 'routerErrorHandler',
    ],

    emits: ['start-impersonating'],

    data: () => ({
        profile: null,
    }),

    computed: {
        ...mapState(['user', 'meta', 'enums', 'impersonating']),
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['isMobile']),
        ...mapGetters(['isWebview']),
        isSelfVisiting() {
            return this.user.id === this.profile.id;
        },
    },

    created() {
        if (this.isAuth) {
            this.fetch();
        }
    },

    methods: {
        ...mapMutations(['updateAvatar']),
        dateFormat(date) {
            return date
                ? format(date, this.meta.dateFormat)
                : null;
        },
        fetch() {
            this.http.get(this.route(this.$route.name, this.$route.params.user))
                .then(response => (this.profile = response.data.user))
                .catch(this.errorHandler);
        },
        startImpersonating() {
            eventBus.$emit('start-impersonating', this.profile.id);
        },
        generateAvatar() {
            this.http.patch(this.route('core.avatars.update', this.user.avatar.id))
                .then(this.updateAvatar)
                .catch(this.errorHandler);
        },
    },
};
</script>

<style lang="scss" scoped>
    .controls, .details {
        justify-content: center;
    }

    .has-left-border {
        border-left: 1px solid rgba(0,0,0,0.2);
    }

    .has-right-border {
        border-right: 1px solid rgba(0,0,0,0.2);
    }

    .details > .column {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
