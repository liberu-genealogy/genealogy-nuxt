<template>
    <div class="wrapper">
        <div v-if="ready">
            <button class="button is-success mb-3"
                @click="team=factory()"
                :disabled="team">
                <span class="icon is-small">
                    <fa icon="plus"/>
                </span>
                <span>
                    {{ i18n('New team') }}
                </span>
            </button>
            <div class="control has-icons-left has-icons-right is-pulled-right"
                v-if="teams.length > 3">
                <input class="team-search input"
                    type="text"
                    :placeholder="i18n('Filter teams')"
                    v-model="query">
                <span class="icon is-small is-left">
                    <fa icon="search"/>
                </span>
                <span class="icon is-small is-right clear-button"
                    v-if="query"
                    @click="query = null">
                    <a class="delete is-small"/>
                </span>
            </div>
        </div>
        <h4 class="title is-4 has-text-centered"
            v-if="!ready && loading">
            {{ i18n('Loading') }}
            <span class="icon is-small ml-2">
                <fa icon="spinner"
                    size="xs"
                    spin/>
            </span>
        </h4>
        <div class="columns is-multiline" v-else>
            <div class="column is-one-third-widescreen is-half-tablet"
                v-if="team">
                <team :team="team"
                    @cancel="team = null"
                    @create="teams.unshift($event); team = null"/>
            </div>
            <div class="column is-one-third-widescreen is-half-tablet"
                v-for="(team, index) in filteredTeams"
                :key="index">
                <team :team="team"
                    @destroy="teams.splice(index, 1)"/>
            </div>
            <div class="column"
                v-if="teams.length === 0">
                <h3 class="subtitle is-3 has-text-centered">
                    {{ i18n('No teams were created yet') }}
                </h3>
            </div>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.teams.index'
}
</router>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Team from '~/components/teams/bulma/pages/teams/components/Team.vue';

library.add(faPlus, faSearch, faSpinner);

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Teams',
    },

    inject: ['errorHandler', 'i18n', 'route'],

    components: { Team },

    data: () => ({
        loading: false,
        ready: false,
        teams: [],
        team: null,
        query: null,
    }),

    computed: {
        filteredTeams() {
            return this.query
                ? this.teams.filter(({ edit, name }) => edit || name.toLowerCase()
                    .indexOf(this.query.toLowerCase()) > -1)
                : this.teams;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.loading = true;

            this.$axios.get(this.route('administration.teams.index'))
                .then(({ data }) => {
                    this.teams = data;
                    this.loading = false;
                    this.ready = true;
                })
                .catch(this.errorHandler);
        },
        factory() {
            return {
                id: null,
                name: null,
                userIds: [],
                users: [],
                edit: true,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .control.has-icons-right {
        .icon.clear-button {
            pointer-events: all;
        }

        input.team-search {
            width: 150px;
        }
    }
</style>
