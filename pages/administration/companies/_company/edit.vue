<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                ref="form">
                <template v-slot:mandatary="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
            </enso-form>
            <accessories>
                <template v-slot="{ count }">
                    <tab keep-alive
                        id="People">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <people :id="companyId"
                                    @update="$set(count, 'People', $refs.people.count)"
                                    @remove="personRemoved"
                                    ref="people"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        id="Addresses">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <addresses :id="companyId"
                                    type="company"
                                    @update="$set(count, 'Addresses', $refs.addresses.count)"
                                    ref="addresses"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.companies.edit',
}
</router>

<script>
import { Tab } from '@enso-ui/tabs/bulma';
import Accessories from '@enso-ui/accessories/bulma';
import { Addresses } from '@enso-ui/addresses/bulma';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import People from '~/components/companies/bulma/pages/companies/components/People.vue';

export default {
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Company',
    },

    components: {
        EnsoForm,
        FormField,
        Accessories,
        Tab,
        Addresses,
        People,
    },

    computed: {
        companyId() {
            return Number.parseInt(this.$route.params.company, 10);
        },
        pivotParams() {
            return {
                companies: { id: this.companyId },
            };
        },
    },

    methods: {
        personRemoved(personId) {
            if (this.$refs.form.field('mandatary').value === personId) {
                this.$refs.form.field('mandatary').value = null;
            }
        },
    },
};
</script>
