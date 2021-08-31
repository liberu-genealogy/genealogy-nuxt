<template>
    <div class="box info-box is-paddingless raises-on-hover"
        :class="[
            { 'is-danger': team.edit && !team.id },
            { 'is-warning': team.edit && team.id },
            { 'is-info': !team.edit && team.users.length === 0 },
        ]">
        <div class="box-header p-2 has-background-light">
            <div class="level is-mobile">
                <div class="level-left">
                    <div name="left"
                        class="level-item ml-1">
                        <label class="label">
                            <input class="input team-name"
                                v-model="team.name"
                                v-if="team.edit"
                                v-focus>
                            <span v-else>
                                {{ team.name }}
                            </span>
                        </label>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item has-text-right">
                        <a class="button is-naked animated fadeIn"
                            v-if="!team.edit"
                            @click="team.edit = true">
                            <span class="icon">
                                <fa icon="pencil-alt"
                                    size="sm"/>
                            </span>
                        </a>
                        <span class="animated fadeIn"
                            v-else>
                            <a class="button is-naked is-outlined"
                                @click="$emit('cancel');team.edit = false">
                                <span class="icon">
                                    <fa icon="ban"/>
                                </span>
                            </a>
                            <a class="button is-naked is-success is-outlined"
                                :disabled="!team.name"
                                @click="store();">
                                <span class="icon">
                                    <fa icon="check"
                                        size="sm"/>
                                </span>
                            </a>
                            <a class="button is-naked is-danger is-outlined"
                                @click="destroy"
                                v-if="team.id !== null">
                                <span class="icon">
                                    <fa icon="trash"/>
                                </span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-body p-2">
            <avatar-list :users="team.users"/>
            <span v-if="!team.edit && !loading && team.users.length === 0"
                class="has-text-muted is-italic mb-1">
                {{ i18n('No users yet') }}
            </span>
            <fade>
                <div class="mb-3 mt-3"
                    v-if="team.edit && team.name">
                    <label class="label">
                        {{ i18n('Members') }}:
                    </label>
                    <enso-select v-model="team.userIds"
                        multiple
                        source="administration.users.options"
                        label="person.name"/>
                </div>
            </fade>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBan, faPencilAlt, faTrash, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';
import { Fade } from '@enso-ui/transitions';
import { EnsoSelect } from '@enso-ui/select/bulma';
import AvatarList from './AvatarList.vue';

library.add([faBan, faPencilAlt, faTrash, faCheck]);

export default {
    name: 'Team',

    inject: ['errorHandler', 'i18n', 'route', 'toastr'],

    directives: { focus },

    components: { Fade, EnsoSelect, AvatarList },

    props: {
        team: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        loading: false,
    }),

    methods: {
        store() {
            this.loading = true;

            this.$axios.post(this.route('administration.teams.store'), this.team)
                .then(({ data }) => {
                    this.loading = false;
                    this.toastr.success(data.message);
                    this.team.users = data.team.users;
                    this.team.id = data.team.id;
                    this.team.edit = false;
                    this.$emit('create', this.team);
                }).catch((error) => {
                    if (error.response.status === 422) {
                        this.toastr.warning(this.i18n('Choose another name'));
                        return;
                    }
                    this.errorHandler(error);
                });
        },
        destroy() {
            this.loading = true;

            this.$axios.delete(this.route('administration.teams.destroy', this.team.id))
                .then(({ data }) => {
                    this.loading = false;
                    this.toastr.success(data.message);
                    this.team.edit = false;
                    this.$emit('destroy');
                }).catch(this.errorHandler);
        },
    },
};
</script>

<style lang="scss">
    .team-name {
        width: 200px;
        border-top: unset;
        border-left: unset;
        border-right: unset;
        box-shadow: unset;
        border-radius: 0;

        &:focus {
            box-shadow: unset;
        }
    }
</style>
