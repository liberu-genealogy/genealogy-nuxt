<template>
    <div class="tokens-wrapper">
        <div class="field is-grouped">
            <p class="control">
                <a class="button is-rounded is-small is-bold is-info"
                    @click="form = true"
                    v-if="canAccess('administration.users.tokens.create')">
                    <span>
                        {{ i18n('New Token') }}
                    </span>
                    <span class="icon">
                        <fa icon="plus"/>
                    </span>
                </a>
            </p>
            <p class="control has-icons-left has-icons-right is-expanded">
                <input v-model="query"
                    class="input is-rounded is-small is-expanded"
                    type="text"
                    :placeholder="i18n('Filter')">
                <span class="icon is-small is-left">
                    <fa icon="search"/>
                </span>
                <span v-if="query"
                    class="icon is-small is-right clear-button"
                    @click="query = ''">
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
            <div v-for="(token, index) in filtered"
                :key="token.id">
                <token :id="id"
                    :token="token"
                    @delete="destroy(token, index)"/>
            </div>
        </div>
        <token-form :path="create"
            @close="form = false"
            @submit="onCreate"
            ref="form"
            v-if="form"/>
        <url :show="token !== ''"
            :link="token"
            @close="token = ''"/>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSync, faSearch } from '@fortawesome/free-solid-svg-icons';
import Url from '~/components/files/bulma/pages/files/components/Url.vue'; // TODO:: refactor to a package
import Token from './Token.vue';
import TokenForm from './TokenForm.vue';

library.add(faPlus, faSync, faSearch);

export default {
    name: 'Tokens',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'toastr'],

    components: {
        Token, TokenForm, Url,
    },

    props: {
        id: {
            type: [Number, String],
            required: true,
        },
    },

    data: () => ({
        tokens: [],
        query: '',
        form: false,
        token: '',
    }),

    computed: {
        filtered() {
            const query = this.query.toLowerCase();

            return query
                ? this.tokens.filter(({ name }) => name.toLowerCase().indexOf(query) > -1)
                : this.tokens;
        },
        count() {
            return this.filtered.length;
        },
        create() {
            return this.route(
                'administration.users.tokens.create',
                this.$route.params,
            );
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            axios.get(this.route('administration.users.tokens.index', this.$route.params))
                .then(({ data }) => {
                    this.tokens = data;
                    this.$emit('update');
                }).catch(this.errorHandler);
        },
        destroy({ id }, index) {
            axios.delete(
                this.route('administration.users.tokens.destroy', this.$route.params),
                { params: { id } },
            ).then(({ data }) => {
                const deletedToken = this.tokens.splice(index, 1).pop();
                this.$emit('remove', deletedToken.id);
                this.$emit('update');
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        },
        onCreate({ token }) {
            this.fetch();
            this.form = false;
            setTimeout(() => {
                this.token = token;
            }, 500);
        },
    },
};
</script>
