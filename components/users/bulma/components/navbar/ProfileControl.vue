<template>
    <core-profile-control>
        <template #default="{ user, hide, isTouch, visitProfile, toggle, visible }">
            <a class="navbar-item"
                @click="visitProfile()"
                v-if="isTouch">
                <avatar class="is-30x30"
                    :user="user"/>
            </a>
            <div :class="[
                'navbar-item user-profile',
                { 'has-dropdown': !isTouch },
                { 'is-active': visible }
            ]" v-else>
                <a class="navbar-link is-arrowless"
                    @click.stop="toggle()">
                    <avatar class="is-30x30"
                        :user="user"/>
                    <span class="ml-1">
                        {{ user.person.appellative || user.person.name }}
                    </span>
                </a>
                <div class="navbar-dropdown is-right"
                    v-click-outside="hide"
                    v-if="visible">
                    <div class="user-panel p-2">
                        <avatar class="is-96x96"
                            :user="user"/>
                        <p class="title is-6 mt-3 has-text-centered">
                            {{ user.person.appellative }}
                        </p>
                        <p class="subtitle is-6 mt-3 has-text-centered">
                            {{ user.role.name }}
                        </p>
                    </div>
                    <hr class="navbar-divider">
                    <nav class="level navbar-item">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="button is-small is-success ml-1"
                                    @click="visitProfile(); toggle()">
                                    <span>{{ i18n('Profile') }}</span>
                                    <span class="icon is-small">
                                        <fa icon="eye"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <a class="button is-small is-danger ml-3"
                                    @click="logout(); toggle()">
                                    <span>{{ i18n('Logout') }}</span>
                                    <span class="icon is-small">
                                        <fa icon="sign-out-alt"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </template>
    </core-profile-control>
</template>

<script>
import { mapActions } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { clickOutside } from '@enso-ui/directives';
import CoreProfileControl from '../../../core/components/navbar/ProfileControl.vue';
import Avatar from '../../pages/users/components/Avatar.vue';

library.add(faEye, faSignOutAlt);
export default {
    name: 'ProfileControl',

    directives: { clickOutside },

    components: { Avatar, CoreProfileControl, Fa },

    inject: ['i18n'],

    methods: {
        ...mapActions('auth', ['logout']),
    },
};
</script>

<style lang="scss">
    .user-profile {
        img.is-rounded {
            border-radius: 290486px;
        }

        .user-panel {
            width: 17em;
            .image.avatar.is-96x96 {
                img {
                    max-height: 96px;
                }
            }
        }
    }
</style>
