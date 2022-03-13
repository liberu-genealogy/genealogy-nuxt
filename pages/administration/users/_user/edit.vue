<template>
    <div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                ref="form"
                @ready="
                    ready = true;
                    pivotParams.userGroups.id = $refs.form.field('group_id').value;
                ">
                <template v-slot:group_id="props">
                    <form-field v-bind="props"
                        @input="pivotParams.userGroups.id = $event"/>
                </template>
                <template v-slot:role_id="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
                <template v-slot:password="props">
                    <form-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @input="password = $event.target.value"
                        v-if="!props.field.meta.hidden"/>
                    <password-strength class="mt-1"
                        :password="props.field.value"/>
                </template>
                <template v-slot:password_confirmation="props">
                    <form-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @input="passwordConfirmation = $event.target.value"
                        @keydown="$emit('update');"
                        v-if="!props.field.meta.hidden"/>
                </template>
                <template v-slot:actions-left>
                    <div class="level-item"
                        v-if="canAccess('administration.users.destroy')">
                        <a class="button is-danger"
                            @click="deletableUser = Number.parseInt($route.params.user, 10)"
                            v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Delete') }}
                            </span>
                            <span class="icon">
                                <fa icon="trash-alt"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item">
                        <a class="button is-warning"
                            @click="$router.push({
                                name: 'administration.people.edit',
                                params: { person: $refs.form.param('personId') }
                            })"
                            v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Edit Person') }}
                            </span>
                            <span class="icon">
                                <fa icon="user-tie"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item"
                        v-if="canAccess('administration.users.resetPassword')">
                        <a class="button is-black"
                           @click="resetPassword"
                           v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Reset Password') }}
                            </span>
                            <span class="icon">
                                <fa icon="redo"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                </template>
            </enso-form>
            <accessories>
                <template v-slot="{ count }">
                    <tab keep-alive
                        v-if="canAccessTokens"
                        id="Tokens">
                        <div class="columns is-centered">
                            <div class="column is-half">
                                <tokens :id="$route.params.user"
                                    @update="$set(count, 'Tokens', $refs.tokens.count)"
                                    ref="tokens"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        v-if="canAccessSessions"
                        id="Sessions">
                        <div class="columns is-centered">
                            <div class="column is-half">
                                <sessions :id="$route.params.user"
                                    @update="$set(count, 'Sessions', $refs.sessions.count)"
                                    ref="sessions"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
            <delete-modal :user-id="deletableUser"
                @close="deletableUser = null"
                @destroyed="navigateToIndex"
                v-if="!!deletableUser"/>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.users.edit'
}
</router>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUserTie, faTrashAlt, faKey, faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import Accessories from '@enso-ui/accessories/bulma';
import { Tab } from '@enso-ui/tabs/bulma';
import { mapState } from 'vuex';
import PasswordStrength from '~/components/auth/PasswordStrength.vue'; // TODO::FIX IT!
import DeleteModal from '~/components/users/bulma/pages/users/components/DeleteModal.vue';
import Tokens from '~/components/users/bulma/pages/users/components/Tokens.vue';
import Sessions from '~/components/users/bulma/pages/users/components/Sessions.vue';

library.add(faUserTie, faTrashAlt, faKey, faRedo);

export default {
    meta: {
        breadcrumb: 'edit',
        title: 'Edit User',
    },

    components: {
        Accessories,
        DeleteModal,
        EnsoForm,
        FormField,
        PasswordStrength,
        Sessions,
        Tab,
        Tokens,
    },

    inject: ['i18n', 'canAccess', 'errorHandler', 'route', 'routerErrorHandler', 'toastr'],

    data: () => ({
        deletableUser: null,
        ready: false,
        pivotParams: { userGroups: { id: null } },
        password: null,
        passwordConfirmation: null,
    }),

    computed: {
        ...mapState(['enums', 'user']),
        canAccessSessions() {
            return this.canAccess('administration.users.sessions.index')
                && (`${this.user.role.id}` === this.enums.roles.Admin
                || this.user.id === this.$route.params.user);
        },
        canAccessTokens() {
            return this.canAccess('administration.users.tokens.index');
        },
    },

    methods: {
        navigateToIndex() {
            this.deletableUser = null;

            this.$nextTick(() => this.$router
                .push({ name: 'administration.users.index' })
                .catch(this.routerErrorHandler));
        },
        resetPassword() {
            axios.post(this.route('administration.users.resetPassword', this.$route.params))
                .then(({ data }) => this.toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>
