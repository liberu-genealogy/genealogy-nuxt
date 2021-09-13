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
                <figure class="image is-128x128 avatar">
                    <img class="is-rounded"
                        :src="route('core.avatars.show', avatarId)">
                </figure>
                <div class="field is-grouped is-justify-content-center mt-3">
                    <p class="control">
                        <a class="button is-primary"
                            v-if="isSelfVisiting"
                            @click="updateAvatar">
                            <span class="icon">
                                <fa icon="sync-alt"/>
                            </span>
                            <span>
                                {{ i18n('Avatar') }}
                            </span>
                        </a>
                    </p>
                    <p class="control">
                        <uploader @upload-successful="setUserAvatar($event.id)"
                            :url="route('core.avatars.store')"
                            file-key="avatar"
                            v-if="isSelfVisiting">
                            <template v-slot:control="{ controlEvents }">
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
                        </uploader>
                    </p>
                    <p class="control"
                        v-if="
                            !isWebview
                            && !isSelfVisiting
                            && canAccess('core.impersonate.start')
                            && !impersonating
                        ">
                        <a class="button is-warning"
                            @click="$root.$emit('start-impersonating', profile.id)">
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
                            })"
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
        <div class="level is-mobile mt-2">
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
import {
    mapState, mapMutations, mapActions, mapGetters,
} from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUser, faUserCircle, faSyncAlt, faTrashAlt, faUpload, faSignOutAlt, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Uploader } from '@enso-ui/uploader/bulma';
import Divider from '@enso-ui/divider';

library.add(faUser, faUserCircle, faSyncAlt, faTrashAlt, faUpload, faSignOutAlt, faPencilAlt);

export default {
    name: 'UserProfile',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'routerErrorHandler'],

    components: { Uploader, Divider },

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
        avatarId() {
            return this.isSelfVisiting
                ? this.user.avatar.id
                : this.profile.avatar.id;
        },
    },

    created() {
        if (this.isAuth) {
            this.fetch();
        }
    },

    methods: {
        ...mapMutations(['setUserAvatar']),
        fetch() {
            this.$axios.get(this.route(this.$route.name, this.$route.params.user))
                .then(response => (this.profile = response.data.user))
                .catch(this.errorHandler);
        },
        updateAvatar() {
            this.$axios.patch(this.route('core.avatars.update', this.user.avatar.id))
                .then(({ data }) => this.setUserAvatar(data.avatarId))
                .catch(this.errorHandler);
        },
        dateFormat(date) {
            return date
                ? this.$format(date, this.meta.dateFormat)
                : null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .avatar {
        margin: auto;
    }

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
