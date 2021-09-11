<template>
    <modal portal="events-form"
        v-on="$listeners">
        <enso-form class="box has-background-light"
            v-bind="$attrs"
            :params="params"
            :key="key"
            v-on="$listeners"
            @ready="setFields"
            disable-state>
            <template v-slot:actions-left
                v-if="canLocalize">
                <a class="button is-warning"
                   :class="{'loading': loading}"
                    @click="localize">
                    <span class="is-hidden-mobile">
                        {{ i18n('Localize') }}
                    </span>
                    <span class="icon">
                        <fa icon="map-pin"/>
                    </span>
                    <span class="is-hidden-mobile"/>
                </a>
            </template>
            <template v-slot:country_id="{ field }">
                <form-field :field="field"
                    @input="rerender"/>
            </template>
            <template v-slot:postcode="{ field, errors }">
                <div class="is-fullwidth">
                    <label class="label">
                        {{ i18n(field.label) }}
                    </label>
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input class="input"
                                :class="['input', { 'is-danger': errors.has(field.name) }]"
                                type="text"
                                :placeholder="i18n(field.meta.placeholder)"
                                v-model="field.value"
                                @input="errors.clear(field.name)">
                        </div>
                        <div class="control"
                            v-if="canAccess('core.addresses.postcode')">
                            <a :class="['button', postcodeCss]"
                                @click="loadAddress">
                           <span class="icon">
                                <fa icon="search-location"/>
                           </span>
                            </a>
                        </div>
                    </div>
                    <p class="help is-danger"
                        v-if="errors.has(field.name)">
                        {{ errors.get(field.name) }}
                    </p>
                </div>
            </template>
            <template v-slot:region_id="{ field, errors }">
                <form-field :field="field"
                    @input="
                        localityParams.region_id = $event;
                        errors.clear(field.name);
                    "/>
            </template>
            <template v-slot:locality_id="{ field, errors }">
                <form-field :field="field"
                    :params="localityParams"
                    @input="
                        errors.clear(field.name)
                    "/>
            </template>
        </enso-form>
    </modal>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLocationArrow, faMapPin, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@enso-ui/modal/bulma';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
library.add(faLocationArrow, faMapPin, faSearchLocation);
export default {
    name: 'EventsForm',
    components: { Modal, EnsoForm, FormField },
    props: {
        id: {
            type: [String, Number],
            required: true,
        },
        type: {
            type: String,
            default: null,
        },
    },
    inject: ['canAccess', 'errorHandler', 'i18n', 'route'],
    data: () => ({
        key: 1,
        form: null,
        loading: false,
        postcode: null,
        params: {
            countryId: null,
        },
        localityParams: {
            region_id: null,
        },
    }),
    computed: {
        canLocalize() {
            return this.form && this.form.routeParam('address')
                && this.canAccess('core.addresses.localize');
        },
        field() {
            return this.form && this.form.field;
        },
        postcodeCss() {
            if (this.postcode === null) {
                return 'is-info';
            }
            return this.postcode
                ? 'is-success'
                : 'is-danger';
        },
    },
    methods: {
        localize() {
            this.loading = true;
            const address = this.form.routeParam('address');
            axios.get(this.route('core.addresses.localize', address))
                .then(({ data }) => {
                    const { lat, long } = data;
                    this.field('lat').value = lat;
                    this.field('long').value = long;
                }).catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        rerender(countryId) {
            this.params.countryId = countryId;
            this.key++;
        },
        setFields({ form }) {
            this.form = form;
            this.field('addressable_id').value = this.id;
            this.field('addressable_type').value = this.type;
            this.localityParams.region_id = this.field('region_id').value;
            this.$emit('form-loaded', form);
        },
        loadAddress() {
            this.loading = true;
            this.postcode = null;
            const params = { params: {
                postcode: this.field('postcode').value,
                country_id: this.field('country_id').value,
            } };
            axios.get(this.route('core.addresses.postcode'), params)
                .then(({ data: { postcode } }) => {
                    ['lat', 'long', 'city', 'region_id', 'locality_id', 'street']
                        .forEach(key => (this.field(key).value = postcode[key]
                        || this.field(key).value));
                    this.postcode = true;
                }).catch((error) => {
                    const { status, data } = error.response;
                    this.postcode = false;
                    if (status === 422) {
                        this.form.errors.set(data.errors);
                        this.$nextTick(this.form.focusError);
                    } else {
                        this.errorHandler(error);
                    }
                }).finally(() => (this.loading = false));
        },
    },
};
</script>