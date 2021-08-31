<template>
    <div class="people-wrapper">
        <div class="field is-grouped">
            <slot name="controls"
                :create="create"
                :internal-query="internalQuery"
                :fetch="fetch">
                <p class="control">
                    <a class="button is-rounded is-small is-bold is-info"
                        @click="create()"
                        v-if="canAccess('administration.companies.people.create')">
                        <span>
                            {{ i18n('Assign') }}
                        </span>
                        <span class="icon">
                            <fa icon="plus"/>
                        </span>
                    </a>
                </p>
                <p class="control has-icons-left has-icons-right is-expanded">
                    <input v-model="internalQuery"
                        class="input is-rounded is-small is-expanded"
                        type="text"
                        :placeholder="i18n('Filter')">
                    <span class="icon is-small is-left">
                        <fa icon="search"/>
                    </span>
                    <span v-if="internalQuery"
                        class="icon is-small is-right clear-button"
                        @click="internalQuery = ''">
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
            </slot>
        </div>
        <div class="columns is-multiline mt-3">
            <div class="column is-half-tablet"
                v-for="(person, index) in filteredPeople"
                :key="person.id">
                <person :id="id"
                    :person="person"
                    @edit="edit(person)"
                    @delete="removedPerson = person"/>
            </div>
        </div>
        <person-form :path="path"
            :company-id="id"
            @close="path = null"
            @edit-person="navigateToPerson"
            @submit="fetch(); path = null"
            ref="form"
            v-if="path"/>
        <modal @close="removedPerson = null"
            class="remove-person"
            v-if="!!removedPerson">
            <div class="box">
                <h5 class="subtitle is-5">
                    {{ i18n("What would you like to do?") }}
                </h5>
                <hr>
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <button class="button is-outlined"
                                @click="removedPerson = null">
                                {{ i18n('Cancel') }}
                            </button>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <button class="button is-warning ml-1"
                                @click="destroy().then(() => (removedPerson = null))">
                                {{ i18n('Remove person from company') }}
                            </button>
                        </div>
                        <div class="level-item">
                            <button class="button is-danger ml-1"
                                @click="destroy().then(destroyPerson)">
                                {{ i18n('Delete person from application') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSync, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@enso-ui/modal/bulma';
import Person from './Person.vue';
import PersonForm from './PersonForm.vue';

library.add(faPlus, faSync, faSearch);

export default {
    name: 'People',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'routerErrorHandler', 'toastr'],

    components: { Person, PersonForm, Modal },

    props: {
        id: {
            type: Number,
            required: true,
        },
        query: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        loading: false,
        people: [],
        path: null,
        internalQuery: '',
        removedPerson: null,
    }),

    computed: {
        filteredPeople() {
            const query = this.internalQuery.toLowerCase();

            return query
                ? this.people.filter(({ name, position }) => name.toLowerCase().indexOf(query) > -1
                    || position.toLowerCase().indexOf(query) > -1)
                : this.people;
        },
        count() {
            return this.filteredPeople.length;
        },
    },

    watch: {
        query() {
            this.internalQuery = this.query;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.loading = true;

            this.$axios.get(this.route(
                'administration.companies.people.index',
                { company: this.id },
            )).then(({ data }) => {
                this.people = data;
                this.$emit('update');
            }).catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        create() {
            this.path = this.route(
                'administration.companies.people.create',
                { company: this.id },
            );
        },
        edit(person) {
            this.path = this.route(
                'administration.companies.people.edit',
                { company: this.id, person: person.id },
            );
        },
        destroy() {
            this.loading = true;

            return this.$axios.delete(this.route(
                'administration.companies.people.destroy',
                { company: this.id, person: this.removedPerson.id },
            )).then(() => {
                const index = this.people.findIndex(({ id }) => id === this.removedPerson.id);
                this.people.splice(index, 1);
                this.$emit('remove', this.removedPerson.id);
                this.$emit('update');
            }).catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        destroyPerson() {
            this.loading = true;

            return this.$axios.delete(
                this.route('administration.people.destroy', { person: this.removedPerson.id }),
            ).then(({ data: { message } }) => this.toastr.success(message))
                .catch(this.errorHandler)
                .finally(() => {
                    this.loading = false;
                    this.removedPerson = null;
                });
        },
        navigateToPerson($event) {
            this.path = null;

            this.$nextTick(() => {
                this.$router.push({
                    name: 'administration.people.edit',
                    params: { person: $event },
                }).catch(this.routerErrorHandler);
            });
        },
    },
};
</script>
<style>
@media screen and (min-width: 1023px) {
    .remove-person .modal-content {
        width: 750px;
    }
}
</style>
