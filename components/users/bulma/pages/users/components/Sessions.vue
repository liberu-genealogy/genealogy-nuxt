<template>
    <div class="sessions-wrapper">
        <div class="field is-grouped">
            <p class="control has-icons-left has-icons-right is-expanded">
                <input v-model="query"
                    class="input is-rounded is-small is-expanded"
                    type="text"
                    :placeholder="i18n('Filter')">
                <span class="icon is-small is-left">
                    <fa icon="search"/>
                </span>
                <span class="icon is-small is-right clear-button"
                    @click="query = ''"
                    v-if="query">
                    <a class="delete is-small"/>
                </span>
            </p>
            <p class="control">
                <a class="button is-rounded is-small is-bold ml-2"
                    @click="fetch()">
                    <span>
                        {{ i18n('Reload') }}
                    </span>
                    <span class="icon">
                        <fa icon="sync"/>
                    </span>
                </a>
            </p>
        </div>
        <div>
            <div v-for="(session, index) in filteredSessions"
                :key="session.id">
                <session :id="id"
                    :session="session"
                    @delete="destroy(session, index)"/>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSync, faSearch } from '@fortawesome/free-solid-svg-icons';
import Session from './Session.vue';

library.add(faPlus, faSync, faSearch);

export default {
    name: 'Sessions',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'toastr'],

    components: { Session },

    props: {
        id: {
            type: [Number, String],
            required: true,
        },
    },

    data: () => ({
        sessions: [],
        query: '',
        form: false,
    }),

    computed: {
        filteredSessions() {
            const query = this.query.toLowerCase();

            return query
                ? this.sessions.filter(({ ipAddress, OS, browser }) => OS.toLowerCase().indexOf(query) > -1
                    || ipAddress.toLowerCase().indexOf(query) > -1
                    || browser.toLowerCase().indexOf(query) > -1)
                : this.sessions;
        },
        count() {
            return this.filteredSessions.length;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.$axios.get(this.route('administration.users.sessions.index', this.$route.params))
                .then(({ data }) => {
                    this.sessions = data;
                    this.$emit('update');
                }).catch(this.errorHandler);
        },
        destroy({ id }, index) {
            this.$axios.delete(
                this.route('administration.users.sessions.destroy', this.$route.params),
                { params: { id } },
            ).then(({ data }) => {
                const deletedToken = this.sessions.splice(index, 1).pop();
                this.$emit('remove', deletedToken.id);
                this.$emit('update');
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        },
    },
};
</script>
